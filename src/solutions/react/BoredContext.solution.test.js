/* eslint-disable react/prop-types */
import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import {
  BoredProvider,
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'
import { getNewActivity } from '../../playgrounds/snippets/boredAPI'

jest.mock('../../playgrounds/snippets/boredAPI')

describe('BoredContext - (2.2 context)', () => {
  describe('<BoredProvider />', () => {
    function ConsumerCheckup({ getNewArgs = [] }) {
      const state = useBoredState()
      const dispatch = useBoredDispatch()

      return (
        <>
          {/* State checkup: */}
          {state.latest === null && <p>Latest is null</p>}
          {state.latest?.key && <p>Latest has key {state.latest.key}</p>}
          {state.latest?.error && <p>Latest has error: {state.latest.error}</p>}

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
          <button onClick={() => dispatch.getNew(...getNewArgs)}>
            Get new activity
          </button>
          <button onClick={dispatch.doneClear}>Clear done</button>
          <button onClick={dispatch.skippedClear}>Clear skipped</button>
        </>
      )
    }

    it('there is no latest or skipped/done lists by default', () => {
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
      const value = {
        latest: {
          ...activityStubs.simple,
          key: '123',
        },
        skipped: ['001', '002'],
        done: ['007'],
      }

      render(
        <BoredProvider value={value}>
          <ConsumerCheckup />
        </BoredProvider>
      )

      expect(screen.getByText('Latest has key 123')).toBeInTheDocument()
      expect(screen.getByText('List skipped is 001, 002')).toBeInTheDocument()
      expect(screen.getByText('List done is 007')).toBeInTheDocument()
    })

    describe('dispatch.getNew', () => {
      it('renders a new activity', async () => {
        render(
          <BoredProvider>
            <ConsumerCheckup />
          </BoredProvider>
        )

        // Act & Assert that a new activity is returned
        getNewActivity.mockResolvedValueOnce({
          ...activityStubs.simple,
          key: '0001',
        })
        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey = await screen.findByText('Latest has key 0001')

        expect(latestKey).toBeInTheDocument()
        expect(screen.getByText('List skipped is empty')).toBeInTheDocument()

        // Act & Assert gettings another activity
        // and saving the latest one to "skipped"
        getNewActivity.mockResolvedValueOnce({
          ...activityStubs.simple,
          key: '0002',
        })

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey2 = await screen.findByText('Latest has key 0002')
        expect(latestKey2).toBeInTheDocument()
      })

      it('adds existing latest activity to skipped', async () => {
        const value = {
          latest: {
            ...activityStubs.simple,
            key: '001',
          },
        }

        render(
          <BoredProvider value={value}>
            <ConsumerCheckup />
          </BoredProvider>
        )

        // Act & Assert that a new activity is returned
        getNewActivity.mockResolvedValueOnce({
          ...activityStubs.simple,
          key: '002',
        })

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey = await screen.findByText('Latest has key 002')
        const skippedList = screen.getByText('List skipped is 001')

        expect(latestKey).toBeInTheDocument()
        expect(skippedList).toBeInTheDocument()

        // 🍀 Sometimes, asserting the DOM isn't enough. In this case,
        // let's ensure getNewActivity was called with the "exclude" list correctly.
        // This is a "foggy" case where asserting the fetch alone
        // wouldn't do much.
        expect(getNewActivity).toHaveBeenLastCalledWith(undefined, ['001'])

        // Act & assert getting one more activity, skipping again the latest one (0003)
        getNewActivity.mockResolvedValueOnce({
          ...activityStubs.simple,
          key: '003',
        })

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKeyAgain = await screen.findByText('Latest has key 003')
        const skippedList4 = screen.getByText('List skipped is 001, 002')

        expect(latestKeyAgain).toBeInTheDocument()
        expect(skippedList4).toBeInTheDocument()

        expect(getNewActivity).toHaveBeenLastCalledWith(undefined, [
          '001',
          '002',
        ])
      })

      it.skip('renders a new activity with given params', async () => {
        const getNewParams = { type: 'educational' }

        getNewActivity.mockResolvedValueOnce({
          ...activityStubs.simple,
          key: '0005',
        })

        render(
          <BoredProvider>
            <ConsumerCheckup getNewArgs={[getNewParams]} />
          </BoredProvider>
        )

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey = await screen.findByText('Latest has key 0005')
        expect(latestKey).toBeInTheDocument()

        expect(getNewActivity).toHaveBeenCalledTimes(1)
        expect(getNewActivity).toHaveBeenCalledWith(getNewParams, [])
      })

      it.skip('render an error given a failure in the API', async () => {
        const getNewParams = { type: 'educational' }
        getNewActivity.mockRejectedValueOnce(new Error('Activity failed'))

        render(
          <BoredProvider>
            <ConsumerCheckup getNewArgs={[getNewParams]} />
          </BoredProvider>
        )

        fireEvent.click(screen.getByText('Get new activity'))

        const latestKey = await screen.findByText(
          'Latest has error: Ups! Activity failed'
        )
        expect(latestKey).toBeInTheDocument()
      })
    })

    describe('dispatch.doneClear', () => {
      it('clears the done list', async () => {
        const value = {
          latest: {
            ...activityStubs.simple,
            key: '009',
          },
          done: ['001', '005'],
        }
        render(
          <BoredProvider value={value}>
            <ConsumerCheckup />
          </BoredProvider>
        )

        expect(screen.getByText('Latest has key 009')).toBeInTheDocument()
        expect(screen.getByText('List done is 001, 005')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Clear done'))

        const listDone = await screen.findByText('List done is empty')
        expect(listDone).toBeInTheDocument()

        // Sanity check that the clar did not clear the entire state
        expect(screen.getByText('Latest has key 009')).toBeInTheDocument()
      })
    })

    describe('dispatch.skippedClear', () => {
      // BONUS #2 Show case wrapper option
      const renderBored = (ui, opts) =>
        render(ui, {
          wrapper: props => (
            <BoredProvider {...props} {...opts.providerProps} />
          ),
          ...opts,
        })

      it('clears the skip list', async () => {
        const value = {
          latest: {
            ...activityStubs.simple,
            key: '009',
          },
          done: ['001', '005'],
          skipped: ['003'],
        }

        renderBored(<ConsumerCheckup />, {
          providerProps: { value },
        })

        expect(screen.getByText('Latest has key 009')).toBeInTheDocument()
        expect(screen.getByText('List skipped is 003')).toBeInTheDocument()

        fireEvent.click(screen.getByText('Clear skipped'))

        const listSkipped = await screen.findByText('List skipped is empty')
        expect(listSkipped).toBeInTheDocument()

        // Sanity check that the clar did not clear the entire state
        expect(screen.getByText('Latest has key 009')).toBeInTheDocument()
        expect(screen.getByText('List done is 001, 005')).toBeInTheDocument()
      })
    })
  })
})

/*
  eslint
    react/display-name: "off"
 */
