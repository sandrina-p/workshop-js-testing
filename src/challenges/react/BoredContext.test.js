/* eslint-disable react/prop-types */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import {
  BoredProvider,
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

// 🍀 Here's the activityStubs for you
import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

// 🍀 Option A: Mocking boredAPI:
// import { getNewActivity } from '../../playgrounds/snippets/boredAPI'
// jest.mock('../../playgrounds/snippets/boredAPI')

// 🍀 Option B: Mocking fetch
// import fetchMock from 'jest-fetch-mock'
// beforeAll(() => {
//   fetchMock.enableMocks()
// })
// afterAll(() => {
//   fetchMock.mockRestore()
// })

describe('BoredContext - (2.2 context)', () => {
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
          {/* 💡 ... */}
        </>
      )
    }

    it('there is no latest or skipped/done lists by default', () => {
      // 🍀 This test is already done for you!
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
      // 💡 render the provider with a custom value

      // 💡 Verify the latest, skipped and done match the given state
    })

    describe('dispatch.getNew', () => {
      it.skip('renders a new activity', async () => {
        expect.assertions(3)
        // Arrange
        // 💡 render the BoredProvider with ConsumerCheckup

        // Act & Assert that a new activity is returned

        // 🍀 Make sure to mock boredAPI value *before* it's called
        // The mock might only return a simple { key: 001 }, or
        // you can use the activityStubs!

        // 💡 Add a button to the Checkup that calls getNew
        // 💡 Click on the created button

        // 💡 Assert the latest key exist
        // (eg assert one of the object keys (key, activity, etc...))

        // 💡 Assert both lists are still empty
      })

      it('adds existing latest activity to skipped', async () => {
        expect.assertions(5)

        // 💡 render the BoredProvider with ConsumerCheckup
        // 🍀 The provider accepts a custom value, we can take advantage
        // of it, and pass directly a value with "latest" filled.

        // 🍀 Make sure to mock boredAPI value *before* it's called
        // The mock might only return a simple { key: 001 }, or...
        // ...you can use the BoredAPIStubs!

        // Act & Assert that a new activity is returned

        // 💡 Click on the button that gets a new activity
        // (You'll need to add a button to the Checkup)

        // 💡 Verity the latest key is updated
        // ...
        // 💡 Verity the skipped list includes the initial latest.
        // ...

        // Act & assert getting one more activity, skipping again the latest one.
        // 💡 This would be a sanity check. For time constraints, you can
        // jump to the next test!
      })

      it.skip('renders a new activity with given params', async () => {
        // ...
      })

      it.skip('render an error given a failure in the API', async () => {
        // ...
      })
    })

    describe('dispatch.doneClear', () => {
      it('clears the done list', async () => {
        expect.assertions(4)

        // 💡 Render the provider.
        // 🍀 There are multiple correct ways to approach this.
        // I'll leave it up to you! The quickest one is to pass
        // a custom done list to the provider.

        // Act
        // 💡 Click "Clear done"
        // 🍀 You'll nedd to create the button in the Checkup
        // fireEvent.click(screen.getByText('Clear done'))

        // Assert
        // 💡 Verify the list "done" is empty again
        // 🍀 Some sanity checks are okay too. Eg. Check the skipped list is the same
      })
    })

    describe('dispatch.skippedClear', () => {
      it.skip('clears the skipped list', async () => {
        // ...
      })
    })
  })
})
