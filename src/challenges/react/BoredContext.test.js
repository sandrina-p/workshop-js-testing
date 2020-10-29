/* eslint-disable react/prop-types */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import {
  BoredProvider,
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { getNewActivity } from '../../playgrounds/react/state/boredAPI'

jest.mock('../../playgrounds/react/state/boredAPI')

describe('BoredContext', () => {
  describe('<BoredProvider />', () => {
    function ConsumerCheckup({ getNewArgs = [] }) {
      const state = useBoredState()
      // const dispatch = useBoredDispatch()

      return (
        <>
          {/* State checkup: */}
          {state.latest === null && <p>Latest is null</p>}
          {/* 🍀 ... what if there's a latest activity? */}

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

    it('renders the latest and lists, empty by default', () => {
      render(
        <BoredProvider>
          <ConsumerCheckup />
        </BoredProvider>
      )

      expect(screen.getByText('Latest is null')).toBeInTheDocument()
      expect(screen.getByText('List skipped is empty')).toBeInTheDocument()
      expect(screen.getByText('List done is empty')).toBeInTheDocument()
    })

    describe('dispatch.getNew', () => {
      it('renders a new activity', async () => {
        const { rerender } = render(
          <BoredProvider>
            <ConsumerCheckup />
          </BoredProvider>
        )

        // Act & Assert that a new activity is returned

        // 💡 Make sure to mock boredAPI value *before* being called
        // 🍀 You need to add a button to the Checkup to click on it.

        // 🍀 You need to add a button to the Checkup.

        // 🍀 Assert the latest exist
        // (eg assert one of its keys (key, activity, etc...))

        // 🍀 Assert both lists are still empty

        // ================================== //
        // Getting one more activiy, skips the latest one

        // Act & Assert getting another activity
        // and saving the latest one to "skipped"

        //  🍀 You need to mock the boredAPI again to return a different key

        const latestKey2 = await screen.findByText('Latest has key 0002')
        expect(latestKey2).toBeInTheDocument()

        // Act & assert getting one more activity, skipping the latest one (0002)
        getNewActivity.mockResolvedValueOnce({
          key: '0003',
        })

        rerender(
          <BoredProvider>
            <ConsumerCheckup getNewArgs={[null, { saveLatestTo: 'skipped' }]} />
          </BoredProvider>
        )

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey3 = await screen.findByText('Latest has key 0003')
        const skippedList = screen.getByText('List skipped is 0002')

        expect(latestKey3).toBeInTheDocument()
        expect(skippedList).toBeInTheDocument()

        // 💡 Sometimes, asserting the DOM isn't enough. In this case,
        // let's ensure the API was called with the "exclude" list correctly.
        expect(getNewActivity).toHaveBeenLastCalledWith(null, ['0002'])

        // Act & assert getting one more activity, skipping again the latest one (0003)
        getNewActivity.mockResolvedValueOnce({
          key: '0004',
        })

        rerender(
          <BoredProvider>
            <ConsumerCheckup getNewArgs={[null, { saveLatestTo: 'skipped' }]} />
          </BoredProvider>
        )

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey4 = await screen.findByText('Latest has key 0003')
        const skippedList4 = screen.getByText('List skipped is 0002, 0003')

        expect(latestKey4).toBeInTheDocument()
        expect(skippedList4).toBeInTheDocument()

        expect(getNewActivity).toHaveBeenLastCalledWith(null, ['0002', '0003'])
      })

      it.todo('renders a new activity with specific params')

      it.todo('renders an error when getting a new activity fails')
    })
  })
})
