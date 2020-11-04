import fetchMock from 'jest-fetch-mock'
import React from 'react'

import {
  fireEvent,
  render,
  screen,
  within,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

import * as BoredContext from '../../playgrounds/react/state/BoredContext'
// 🍀 A fake of BoredContext if you want to use later
import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake.js'

import ActivityGenerator from '../../playgrounds/react/components/activity-generator'

beforeAll(() => {
  // 🍀 Mocked fetch, ready to be used
  fetchMock.enableMocks()

  // 🍀 In case you want to mock debug (and restore it later)
  // jest.spyOn(global.console, 'debug').mockImplementation()
})
afterAll(() => {
  fetchMock.mockRestore()

  // jest.spyOn(global.console, 'debug').mockRestore()
})

const BoredProvider = BoredContext.BoredProvider
const BoredStateContext = BoredContext.BoredStateContext

describe('<ActivityGenerator />', () => {
  it('renders a layout without an activity by default', () => {
    // NOTE: This test is completed

    // Render ActivityGenerator wrapped in BoredProvider
    // without mocks to be as realistic as possible
    render(
      <BoredProvider>
        <ActivityGenerator />
      </BoredProvider>
    )

    //  something to verify it renders without activities
    expect(
      screen.getByRole('button', { name: 'Get random activity' })
    ).toBeInTheDocument()

    expect(screen.getByText('Filters')).toBeInTheDocument()
  })

  describe('clicking the main CTA', () => {
    it('renders a new random activity', async () => {
      expect.assertions(4)
      // 🍀 Use an activity with link as stub
      const activityStubbed = activityStubs.withLink

      render(
        <BoredProvider>
          <ActivityGenerator />
        </BoredProvider>
      )

      // Act
      // 💡 Click the button "Get random activity"
      // 🍀 Make sure to mock the fetch before the click happens
      // ...

      // Assert
      // 💡 Veritfy the loading appears
      // 🍀 There are two approachs here:
      // 🍀 1/2 Option A: Check the loading is in the screen...
      // expect(screen.getByText('Looking...')).toBeInTheDocument()
      // ...and wait for it to disappear
      // await waitFor(() => {
      //   expect(screen.queryByText('Looking...')).not.toBeInTheDocument()
      // })

      // 🍀 2/2 Option B: Use TL "waitForElementToBeRemoved" method.
      // This will fail if on the first assertion the node does not exist.
      // await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // 💡 Access the card (<article />) and its content:

      // 🍀 "within()" allow us to assert element inside a given element
      // const card = within(screen.getByRole('article'))

      // const title = card.getByText(activityStubbed.activity)

      // 💡 Assert the title is in the DOM, as a link
      // ...

      // 💡  Sanity check: Ensure all activity data was passed to the activity card.
      // 1/2 the type (category) is in the doc
      // 2/2 the participants (For 1 person.) is in the document
      // x/3 Anything else missing?
    })

    it.skip('renders an error, given a failure in the activity request', async () => {
      // ...
    })
  })

  describe('within the Activity card', () => {
    describe('clinking "😴" button, add the latest to "skipped" and gets another activity', () => {
      // 💡 There are multiple ways to approach this test.
      // All of them has pros and cons. None is a silver bullet
      // Here's some quick analyzis of each approach. I'll let you
      // choose the one you think is the best:
      // Complete the test of ONLY ONE of the approaches

      it('Approach A: "Checkup pattern"', async () => {
        expect.assertions(3)
        // 🍀 Render a "Checkup" components to help asserting the side
        // effects triggered by the main component.
        // Pros: Uses the real context, no mocks needed, extra confidence.
        // Cons: The "Checkup" component might get a little verbose.

        // 💡 Mock the fetch here, twice (one different for each activity)
        // ...

        render(
          <BoredProvider>
            <ActivityGenerator />
            {/* Checkup component: */}
            <BoredStateContext.Consumer>
              {state => <p>Skipped list: {state.skipped.join(', ')}</p>}
            </BoredStateContext.Consumer>
          </BoredProvider>
        )

        // Act + Assert #1
        // Get first activity as expected
        // 💡 You got this!

        // Act + Assert #2
        // Get the 2nd activity and renders it.

        // 💡 Use the Checkup to verify the "Skipped" list
        //    contains the 1st activity
        // ...
      })

      it('Approach B: Mocking the hooks', async () => {
        expect.assertions(2)
        // 🍀 Mock directly the useContext hooks
        // Pros: The easiest way to test. Might cut-off some "arrangement" steps
        //       before doing the final act + assertions
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

        // 💡 Click the button to get a 2nd activity
        // ...

        // 💡 Assert the dispatchGetNewMocked was called
        // ...
      })

      it('Approach C: Using Fakes', async () => {
        expect.assertions(2)
        // 🍀 Use a fake double of "BoredProvider".
        // Pros: Higher confidence compared to hooks mock, because it's a "fake".
        //       Might cut-off some "arrangement" steps before doing the act + assertions
        // Cons: Still, IT doesn't get the full real behavior,
        //       and it cuts off the access to the boredAPI assertions.
        const activityStubbed = activityStubs.sample
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

        // 💡 Click the button to get a 2nd activity
        // ...

        // 💡 Assert the dispatch.getNew was called
        // ...
      })

      // it.skip('Approach D: Do not test this. Go a level higher or do E2E')
    })

    it.skip('clinking "✅" button, adds the current to "done" and gets a new activity', async () => {
      // ...
    })
  })

  describe('setting filters', () => {
    it('renders an activity that matches given specific filters', async () => {
      expect.assertions(8)

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
      // 💡 Get the filters element - You can use within()
      // const filtersForm = within(screen.get...)

      // 💡 1/3 fill category field
      // ...

      // 💡  2/3 fill number of participants field
      // 🍀 Sanity asserts may also be done
      // ...

      // 💡 3/3 fill price field
      // ...

      // Act
      // 💡 Click the CTA button
      // ...

      // 💡 Assert the new card is in the DOM
      // 🍀 This is an example where asserting the DOM isn't enough
      //    because the fetch response is mocked. So we must assert
      //    fetch request query directly.
      // ...

      // ============================
      // Reseting filters
      // it clears the fields and the fetch request query
      // 🍀 _Write fewer, longer tests._

      // Arrange

      // ...

      // 💡 Click the reset button
      // 🍀 You may want to clear the fetch mock before clicking
      //    reset so the fetch assertion is "1" instead of "2"
      // ...

      // 💡 Sanity check one of the fields was cleared.
      // ...

      // Act
      // 💡 Get another activity (mock a different one)
      // ...
      const btnDone = screen.getByRole('button', { name: 'Done, what else?' })
      fireEvent.click(btnDone)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))

      // Assert
      // 💡 Verify the fetch query is now the default one
      // ...

      // 💡 Sanity check the activity in the DOM is the right one
      // ...
    })
  })
})
