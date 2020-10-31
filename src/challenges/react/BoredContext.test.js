/* eslint-disable react/prop-types */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import {
  BoredProvider,
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

// 💡 Here's the activityStubs for you
import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

// 💡 Option A: Mocking boredAPI:
// import { getNewActivity } from '../../playgrounds/snippets/boredAPI'
// jest.mock('../../playgrounds/snippets/boredAPI')

// 💡 Option B: Mocking fetch
// import fetchMock from 'jest-fetch-mock'
// beforeAll(() => {
//   fetchMock.enableMocks()
// })
// afterAll(() => {
//   fetchMock.mockRestore()
// })

describe('BoredContext', () => {
  describe('<BoredProvider />', () => {
    function ConsumerCheckup({ getNewArgs = [] }) {
      const state = useBoredState()
      // const dispatch = useBoredDispatch()

      return (
        <>
          {/* State checkup: */}
          {state.latest === null && <p>Latest is null</p>}

          {state.skipped.length === 0 ? (
            <p>List skipped is empty</p>
          ) : (
            <p>List skipped is {state.skipped.join(', ')}</p>
          )}
          {state.done.length === 0 ? (
            <p>List done is empty</p>
          ) : (
            <p>List done is {state.done.join(', ')}</p>
          )}

          {/* Dispatch checkup... */}
          {/* 🍀 ... */}
        </>
      )
    }

    it('there is no latest or skipped/done lists by default', () => {
      // 💡 This test is already done for you!
      render(
        <BoredProvider>
          <ConsumerCheckup />
        </BoredProvider>
      )

      expect(screen.getByText('Latest is null')).toBeInTheDocument()
      expect(screen.getByText('List skipped is empty')).toBeInTheDocument()
      expect(screen.getByText('List done is empty')).toBeInTheDocument()
    })

    it('renders { latest, skipped, done } given a custom state', () => {
      expect.assertions(1)
      // 🍀 render the provider with a value

      // 🍀 Verify the latest, skipped and done match the given state
    })

    describe('dispatch.getNew', () => {
      it('renders a new activity', async () => {
        expect.assertions()
        // Arrange
        // 🍀 render the BoredProvider with ConsumerCheckup

        // Act & Assert that a new activity is returned

        // 💡 Make sure to mock boredAPI value *before* it's called
        // The mock might only return a simple { key: 001 }, or
        // you can use the BoredAPIStubs

        // 🍀 Add a button to the Checkup to click on it.

        // 🍀 Assert the latest key exist
        // (eg assert one of its keys (key, activity, etc...))

        // 🍀 Assert both lists are still empty
      })

      it('adds latest activity to skipped, when getting a new one', async () => {
        expect.assertions(3)

        // 🍀 Pass an initial value to the provider
        // with a latest activity

        // Act & Assert that a new activity is returned

        // 🍀 Repeat the sames steps as the previous test to get a new activity.

        // 🍀 Verity the latest key is updated
        // 🍀 Verity the skipped list includes the initial latest.

        // 💡 Sometimes, asserting the DOM isn't enough. In this case,
        // let's ensure the getNewActivity was called with the "exclude" list correctly.

        // Act & assert getting one more activity, skipping again the last latest one.
        // 🍀 This would be a sanity check. For time constraints, you can
        // jump to the next test!
      })

      it.skip('renders an error given a failure from getting a new activity', async () => {
        // ...
      })
    })

    describe('dispatch.doneClear', () => {
      it('clears the done list', async () => {
        expect.assertions(4)

        // 🍀 Render the provider. You might want to pass
        // a custom done list by default to cut some steps.
        // 💡 There are multiple correct ways to approach this.
        // I'll leave it up to you!

        // Act
        // 🍀 Click "Clear done"
        fireEvent.click(screen.getByText('Clear done'))

        // Assert
        // 🍀 Verify the list "done" is empty again
        // 💡 Some sanity checks are okay too. Eg. Check the skipped list is the same
      })

      it.skip('clears the skipped list', async () => {
        // ...
      })
    })
  })
})
