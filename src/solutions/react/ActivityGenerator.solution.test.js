import React from 'react'
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import ActivityGenerator from '../../playgrounds/react/components/activity-generator'

import * as BoredContext from '../../playgrounds/react/state/BoredContext'
import { getNewActivity } from '../../playgrounds/snippets/boredAPI'
import { activityStub } from '../../playgrounds/react/state/__doubles__/boredAPIStubs'
import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredProviderFake.js'

jest.mock('../../playgrounds/snippets/boredAPI')

const BoredProvider = BoredContext.BoredProvider
const BoredStateContext = BoredContext.BoredStateContext

// https://github.com/kentcdodds/testing-react-apps/blob/main/src/__tests__/exercise/07.md

describe('<ActivityCard />', () => {
  it('renders a layout without an activity by default', () => {
    render(
      <BoredProvider>
        <ActivityGenerator />
      </BoredProvider>
    )

    expect(
      screen.getByRole('button', { name: 'Get random activity' })
    ).toBeInTheDocument()

    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  describe('clicking the main CTA', () => {
    it('renders a new random activity', async () => {
      const activityStubbed = activityStub.withLink
      getNewActivity.mockResolvedValueOnce(activityStubbed)
      render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      const CTA = screen.getByRole('button', { name: 'Get random activity' })

      // Act
      fireEvent.click(CTA)

      // Assert

      // // Option A: Check the loading and wait for it to disappear
      // expect(screen.getByText('Looking...')).toBeInTheDocument()

      // await waitFor(() => {
      //   expect(screen.queryByText('Looking...')).not.toBeInTheDocument()
      // })

      // Option B: Use TL "waitForElementToBeRemoved" method.
      // Cool note: This will fail if, on the first assertion, the element doesnt exist.
      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // 💡 "within()"" allow us to assert element inside a given element
      const card = within(screen.getByRole('article'))

      const title = card.getByText(activityStubbed.activity)
      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute('href', activityStub.link)

      // Sanity checks to ensure all was passed to the activity card.
      expect(card.getByText(activityStubbed.type)).toBeInTheDocument() // category
      expect(card.getByText('For 1 person.')).toBeInTheDocument() // participants & price
    })

    it('renders an error, given a failure in the activity request', async () => {
      const activityError = 'No activities!'

      getNewActivity.mockRejectedValueOnce(new Error(activityError))
      render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      const CTA = screen.getByRole('button', { name: 'Get random activity' })

      // Act
      fireEvent.click(CTA)

      // Assert

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      expect(screen.queryByRole('article')).not.toBeInTheDocument()
      expect(screen.getByText(`Ups! ${activityError}`)).toBeInTheDocument()
      expect(
        screen.getByText('Reset the filters and try again.')
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Try again' })
      ).toBeInTheDocument()
    })
  })

  describe('within the Activity card', () => {
    describe('clinking "😴" button, gets another activity and skips the latest', () => {
      beforeEach(() => {
        jest.restoreAllMocks()
      })

      it('Approach A: "Outsider pattern"', async () => {
        // 💡  Render a "outsider" components to help asserting the side
        // effects made by the main component.
        // Pros: Uses the real context, no mocks needed, extra confidence.
        // Cons: The "outsider" component can get a little verbose (not the case).
        const activityStubbed = activityStub.basic

        getNewActivity.mockResolvedValueOnce(activityStubbed)

        render(
          <BoredProvider>
            <ActivityGenerator />
            {/* Outside component: */}
            <BoredStateContext.Consumer>
              {state => <p>Skipped list: {state.skipped.join(', ')}</p>}
            </BoredStateContext.Consumer>
          </BoredProvider>
        )

        // Act
        const CTA = screen.getByRole('button', { name: 'Get random activity' })
        fireEvent.click(CTA)

        // Assert
        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        const title = screen.getByText(activityStubbed.activity)
        expect(title).toBeInTheDocument()

        getNewActivity.mockClear()

        const btnDone = screen.getByRole('button', {
          name: "Nah, that's boring",
        })

        fireEvent.click(btnDone)

        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        expect(getNewActivity).toHaveBeenCalledTimes(1)
        expect(getNewActivity).toHaveBeenCalledWith(expect.anything(), [
          activityStubbed.key, // latest key
        ])

        // Use the Outsider to verify the side-effect 💡 💡 💡 💡
        expect(screen.getByText(/Skipped list/i).textContent).toBe(
          `Skipped list: ${activityStubbed.key}`
        )
      })

      it('Approach B: Mocking the hooks', async () => {
        // 💡 Mock directly the useContext hooks
        // Pros: The easiest way to test. Might cut-off some "arrangement" steps
        //       before doing the final act + assertions
        // Cons: With all mocked, the false sense of security is high too.
        //       The real context might change and this test would still pass.
        const activityStubbed = activityStub.basic
        const dispatchGetNewMocked = jest.fn()

        jest.spyOn(BoredContext, 'useBoredDispatch').mockImplementation(() => ({
          getNew: dispatchGetNewMocked,
        }))
        jest.spyOn(BoredContext, 'useBoredState').mockImplementation(() => ({
          latest: activityStubbed,
        }))

        render(<ActivityGenerator />)

        // Act
        // Because we are mocking the state with an activity right away,
        // there's no need to click "get new activiy" before asserting the "Skip" btn
        const btnDone = screen.getByRole('button', {
          name: "Nah, that's boring",
        })

        fireEvent.click(btnDone)

        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        expect(dispatchGetNewMocked).toHaveBeenCalledTimes(1)
        expect(dispatchGetNewMocked).toHaveBeenCalledWith(expect.anything(), {
          saveLatestTo: 'skipped',
        })
      })

      it('Approach C: Using Fakes', async () => {
        // 💡 Use a fake double of "BoredProviderFake".
        // Pros: Higher confidence compared to direct mock, because it's a "fake".
        //       Might cut-off some "arrangement" steps before doing the act + assertions
        // Cons: Still doesn't get the full real behavior. E.g. No access to boredAPI.
        const activityStubbed = activityStub.basic
        const dispatch = { getNew: jest.fn() }
        const state = { latest: activityStubbed }

        render(
          <BoredProviderFake state={state} dispatch={dispatch}>
            <ActivityGenerator />
          </BoredProviderFake>
        )

        // Act
        // Because we are mocking the state with an activity right away,
        // there's no need to click "get new activiy" before asserting the "Skip" btn
        const btnDone = screen.getByRole('button', {
          name: "Nah, that's boring",
        })

        fireEvent.click(btnDone)

        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        expect(dispatch.getNew).toHaveBeenCalledTimes(1)
        expect(dispatch.getNew).toHaveBeenCalledWith(expect.anything(), {
          saveLatestTo: 'skipped',
        })
      })

      // it.todo('Approach D: Dont test it. Go a level higher or do E2E')
    })

    it('clinking "✅" button, gets another activity and adds the latest do done', async () => {
      const activityStubbed = activityStub.basic

      getNewActivity.mockResolvedValueOnce(activityStubbed)

      // Using "Outside pattern"
      render(
        <BoredProvider>
          <ActivityGenerator />
          <BoredStateContext.Consumer>
            {state => <p>Done list: {state.done.join(', ')}</p>}
          </BoredStateContext.Consumer>
        </BoredProvider>
      )

      // Act
      const CTA = screen.getByRole('button', { name: 'Get random activity' })
      fireEvent.click(CTA)

      // Assert
      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      const title = screen.getByText(activityStubbed.activity)
      expect(title).toBeInTheDocument()

      getNewActivity.mockClear()

      const btnDone = screen.getByRole('button', { name: 'Done, what else?' })

      fireEvent.click(btnDone)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      expect(getNewActivity).toHaveBeenCalledTimes(1)
      expect(getNewActivity).toHaveBeenCalledWith(expect.anything(), [
        activityStubbed.key, // latest
      ])

      expect(screen.getByText(/Done list:/i).textContent).toBe(
        'Done list: 1770521'
      )
    })
  })

  describe('setting filters', () => {
    it('renders an activity that match given specific filters', async () => {
      const activityStubbed = activityStub.withLink

      getNewActivity.mockResolvedValue(activityStubbed)

      render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      const CTA = screen.getByRole('button', { name: 'Get random activity' })

      // Arrange - Fill all filters fields
      const filtersForm = within(screen.getByText('Filters').parentElement)
      // ... fill category
      const categoryField = filtersForm.getByLabelText('Category')
      fireEvent.change(categoryField, { target: { value: 'social' } })

      // ... fill number of participants
      const participantsField = filtersForm.getByLabelText('People nr')
      // 💡 We can also do sanity asserts between each change
      expect(participantsField.value).toBe('')
      fireEvent.change(participantsField, { target: { value: '2' } })
      expect(participantsField.value).toBe('2')

      // ... fill price
      const priceField = filtersForm.getByLabelText('Free')
      fireEvent.click(priceField)

      // Act
      fireEvent.click(CTA)

      // Assert
      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      expect(screen.getByText(activityStubbed.activity)).toBeInTheDocument()

      // 💡 This is an example where asserting the DOM isn't enough
      //    because the BoredAPI is mocked. So we must assert the API call itself.
      expect(getNewActivity).toHaveBeenCalledTimes(1)
      expect(getNewActivity).toHaveBeenCalledWith(
        { participants: '2', price: 'free', type: 'social' },
        []
      )

      // ============================
      // Reseting filters
      // - it clears the fields and the API params

      // 💡 Write fewer, longer tests.
      // Why: https://kentcdodds.com/blog/write-fewer-longer-tests

      // Arrange

      // clear the mocks call, so next assertion is "1" again
      getNewActivity.mockClear()

      const resetBtn = filtersForm.getByRole('button', { name: 'Reset' })
      fireEvent.click(resetBtn)
      // Sanity check one of the fields.
      expect(participantsField.value).toBe('')

      // Act
      const btnDone = screen.getByRole('button', { name: 'Done, what else?' })
      fireEvent.click(btnDone)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // Assert
      expect(getNewActivity).toHaveBeenCalledTimes(1)
      expect(getNewActivity).toHaveBeenCalledWith(
        { participants: undefined, price: undefined, type: undefined },
        [activityStubbed.key]
      )

      expect(screen.getByText(activityStubbed.activity)).toBeInTheDocument()
    })
  })
})
