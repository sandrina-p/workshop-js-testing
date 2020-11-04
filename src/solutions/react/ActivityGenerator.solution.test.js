import React from 'react'
import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import fetchMock from 'jest-fetch-mock'

import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

import * as BoredContext from '../../playgrounds/react/state/BoredContext'
import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake.js'

import ActivityGenerator from '../../playgrounds/react/components/activity-generator'

const BoredProvider = BoredContext.BoredProvider
const BoredStateContext = BoredContext.BoredStateContext

beforeAll(() => {
  fetchMock.enableMocks()

  jest.spyOn(global.console, 'debug').mockImplementation()
})

afterAll(() => {
  fetchMock.mockRestore()

  jest.spyOn(global.console, 'debug').mockRestore()
})

describe('<ActivityGenerator />', () => {
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
      const activityStubbed = activityStubs.withLink

      global.fetch.mockResponseOnce(JSON.stringify(activityStubbed))

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

      // 🍀 "within()"" allow us to assert element inside a given element
      const card = within(screen.getByRole('article'))

      const title = card.getByText(activityStubbed.activity)
      expect(title).toBeInTheDocument()
      expect(title).toHaveAttribute('href', activityStubs.link)

      // Sanity checks to ensure all was passed to the activity card.
      expect(card.getByText(activityStubbed.type)).toBeInTheDocument() // category
      expect(card.getByText('For 1 person.')).toBeInTheDocument() // participants & price
    })

    it('renders an error, given a failure in the activity request', async () => {
      global.fetch.mockResponseOnce(null, {
        status: 400,
      })

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
      expect(screen.getByText(/Ups! /i)).toBeInTheDocument()
      expect(
        screen.getByText('Reset the filters and try again.')
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'Try again' })
      ).toBeInTheDocument()
    })

    it('aborts the loading getNew request on unmount', async () => {
      jest.spyOn(global.console, 'log').mockImplementation()

      const { unmount } = render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      const CTA = screen.getByRole('button', { name: 'Get random activity' })

      // Act
      fireEvent.click(CTA)

      // Assert
      // Wait until Looking is the DOM. It means, is loading...
      expect(screen.getByText('Looking...')).toBeInTheDocument()

      // Act + Assert #2
      unmount()

      // TODO - if this was really implemented, we would assert that
      // boredAPI request abort was called
      expect(global.console.log).toHaveBeenCalledWith(
        'getNewActivity() request aborted!'
      )
    })

    it('dos not abort a finished request on unmount', async () => {
      const activityStubbed = activityStubs.withLink

      global.fetch.mockResponseOnce(JSON.stringify(activityStubbed))

      jest.spyOn(global.console, 'log').mockImplementation()

      const { unmount } = render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      const CTA = screen.getByRole('button', { name: 'Get random activity' })

      // Act
      fireEvent.click(CTA)

      // Wait until Looking is the DOM. It means, is loading...
      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // So, let's unmount now!
      // Act + Assert the actual unmount
      unmount()

      // Assert
      // TODO - IRL we would verify boredAPI request abort was called
      expect(global.console.log).toHaveBeenCalledTimes(0)

      jest.spyOn(global.console, 'log').mockRestore()
    })
  })

  describe('within the Activity card', () => {
    describe('clinking "😴" button, adds the current to "skipped" and gets another activity', () => {
      it('Approach A: "Checkup pattern"', async () => {
        // 🍀 Render a "Checkup" components to help asserting the side
        // effects made by the main component.
        // Pros: Uses the real context, no mocks needed, extra confidence.
        // Cons: The "Checkup" component can get a little verbose (not the case).
        const activityStubbed1 = activityStubs.sample
        const activityStubbed2 = activityStubs.pricePaid

        global.fetch
          .mockResponseOnce(JSON.stringify(activityStubbed1))
          .mockResponseOnce(JSON.stringify(activityStubbed2))

        render(
          <BoredProvider>
            <ActivityGenerator />
            {/* Checkup component: */}
            <BoredStateContext.Consumer>
              {state => <p>Skipped list: {state.skipped.join(', ')}</p>}
            </BoredStateContext.Consumer>
          </BoredProvider>
        )

        // Act + Assert - First activity works fine
        const CTA = screen.getByRole('button', { name: 'Get random activity' })
        fireEvent.click(CTA)

        // Assert
        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        // The activity is in the document.
        // 🍀 To keep it simple, we assert the activity title only.
        // If we feel our confidence in the code is low, we could assert other things too.
        const title = screen.getByText(activityStubbed1.activity)
        expect(title).toBeInTheDocument()

        // Act + Assert #2 - The current activity is skipped
        global.fetch.mockClear()

        const btnDone = screen.getByRole('button', {
          name: "Nah, that's boring",
        })

        fireEvent.click(btnDone)

        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        // Verify the 2nd activity is rendered
        expect(screen.getByText(activityStubbed2.activity)).toBeInTheDocument()

        // 🍀 Use the Checkup to verify the side-effect  🍀
        expect(screen.getByText(/Skipped list/i).textContent).toBe(
          `Skipped list: ${activityStubbed1.key}`
        )
      })

      it('Approach B: Mocking the hooks', async () => {
        // 🍀 Mock directly the useContext hooks
        // Pros: The easiest way to test. Might cut-off some "Arrange" steps
        //       before doing the final Act + Asserts
        // Cons: With all mocked, the false sense of security is high too.
        //       The real context might change and this test would still pass.
        //       Also, we cannot assert the fetch call anymore
        const activityStubbed = activityStubs.sample
        const dispatchGetNewMocked = jest.fn()

        jest.spyOn(BoredContext, 'useBoredDispatch').mockImplementation(() => ({
          getNew: dispatchGetNewMocked,
        }))
        jest.spyOn(BoredContext, 'useBoredState').mockImplementation(() => ({
          latest: activityStubbed,
        }))

        render(<ActivityGenerator />)

        // Act
        // Because we are mocking the state with an latest activity by default,
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

        // Restore mocks to not affect other tests
        jest.spyOn(BoredContext, 'useBoredDispatch').mockRestore()
        jest.spyOn(BoredContext, 'useBoredState').mockRestore()
      })

      it('Approach C: Using Fakes', async () => {
        // 🍀 Use a fake double of "BoredProvider".
        // Pros: Higher confidence compared to direct mock, because it's a "fake".
        //       Might cut-off some "arrangement" steps before doing the act + assertions
        // Cons: Still doesn't get the full real behavior. E.g. No access to boredAPI.
        const getNewMocked = jest.fn()
        const activityStubbed = activityStubs.sample
        const dispatch = { getNew: getNewMocked }
        const state = { latest: activityStubbed }

        render(
          <BoredProviderFake state={state} dispatch={dispatch}>
            <ActivityGenerator />
          </BoredProviderFake>
        )

        // Act
        // Because we are mocking the state with an latest activity by default,
        // there's no need to click "get new activiy" before asserting the "Skip" btn
        const btnDone = screen.getByRole('button', {
          name: "Nah, that's boring",
        })

        fireEvent.click(btnDone)

        await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

        expect(getNewMocked).toHaveBeenCalledTimes(1)
        expect(getNewMocked).toHaveBeenCalledWith(expect.anything(), {
          saveLatestTo: 'skipped',
        })
      })

      // it.skip('Approach D: Do not test this. Go a level higher or do E2E')
    })

    it('clinking "✅" button, adds the current to "done" and gets a new activity', async () => {
      const activityStubbed1 = activityStubs.sample
      const activityStubbed2 = activityStubs.pricePaid

      global.fetch
        .mockResponseOnce(JSON.stringify(activityStubbed1))
        .mockResponseOnce(JSON.stringify(activityStubbed2))

      // Using "Checkup pattern"
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

      const title = screen.getByText(activityStubbed1.activity)
      expect(title).toBeInTheDocument()

      global.fetch.mockClear()

      const btnDone = screen.getByRole('button', { name: 'Done, what else?' })

      fireEvent.click(btnDone)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // Verify the 2nd activity is rendered
      expect(screen.getByText(activityStubbed2.activity)).toBeInTheDocument()

      expect(screen.getByText(/Done list:/i).textContent).toBe(
        'Done list: 1770521'
      )
    })
  })

  describe('setting filters', () => {
    it('renders an activity that matches given specific filters', async () => {
      const activityStubbed1 = activityStubs.sample
      const activityStubbed2 = activityStubs.pricePaid

      global.fetch
        .mockResponseOnce(JSON.stringify(activityStubbed1))
        .mockResponseOnce(JSON.stringify(activityStubbed2))

      render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      // Arrange - Fill all filters fields
      const filtersForm = within(screen.getByText('Filters').parentElement)

      // 1/3 fill category
      const categoryField = filtersForm.getByLabelText('Category')
      fireEvent.change(categoryField, { target: { value: 'social' } })

      // 2/3 fill number of participants
      const participantsField = filtersForm.getByLabelText('People nr')
      // 🍀 Sanity asserts may also be done
      expect(participantsField.value).toBe('')
      fireEvent.change(participantsField, { target: { value: '2' } })
      expect(participantsField.value).toBe('2')

      // 3/3 fill price
      const priceField = filtersForm.getByLabelText('Free')
      fireEvent.click(priceField)

      // Act
      const CTAbtn = screen.getByRole('button', { name: 'Get random activity' })
      fireEvent.click(CTAbtn)

      // Assert
      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      expect(screen.getByText(activityStubbed1.activity)).toBeInTheDocument()

      // 🍀 This is an example where asserting the DOM isn't enough
      //    because the fetch response is mocked. So we must assert the request query.
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.boredapi.com/api/activity/?type=social&participants=2&price=0',
        expect.anything()
      )

      // ============================
      // Reseting filters
      // it clears the fields and the fetch request query
      // 🍀 _Write fewer, longer tests._

      // Arrange

      // clear the mocks call, so next assertion is "1" again
      global.fetch.mockClear()

      const resetBtn = filtersForm.getByRole('button', { name: 'Reset' })
      fireEvent.click(resetBtn)
      // Sanity check one of the fields was cleared.
      expect(participantsField.value).toBe('')

      // Act
      const btnDone = screen.getByRole('button', { name: 'Done, what else?' })
      fireEvent.click(btnDone)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // Assert
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.boredapi.com/api/activity/?',
        expect.anything()
      )

      expect(screen.getByText(activityStubbed2.activity)).toBeInTheDocument()
    })
  })
})
