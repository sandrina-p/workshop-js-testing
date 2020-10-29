import React from 'react'
import PropTypes from 'prop-types'

import { getNewActivity } from './boredAPI'

const BoredStateContext = React.createContext()
const BoredDispatchContext = React.createContext()

function updateList(name, prevValue, newKey) {
  if (!name) return {}

  // ex: { 'skipped': [...[001, 123], 543] }
  return {
    [name]: [...prevValue, newKey],
  }
}

function BoredProvider({ children }) {
  const [state, setState] = React.useState(() => ({
    // latest suggested activity
    latest: null, // : @Activity
    // List with skipped activities, by key id
    skipped: [],
    // List with activities already done, by key id
    done: [],
  }))

  // TODO - convert this to a reducer.
  // TODO - Add a saveLatestTo by default
  const dispatch = {
    async getNew(params, { saveLatestTo } = {}) {
      const latestKey = state.latest?.key

      const exclude = [...state.skipped, ...state.done]
      if (latestKey) exclude.push(latestKey)

      try {
        const activity = await getNewActivity(params, exclude)

        setState(state => ({
          ...state,
          latest: activity,
          ...updateList(saveLatestTo, state[saveLatestTo], latestKey),
        }))
      } catch (e) {
        setState(state => ({
          ...state,
          latest: {
            error: `Ups! ${e.message}`,
          },
          ...updateList(saveLatestTo, state[saveLatestTo], latestKey),
        }))
      }
    },
    skippedClear() {
      setState(state => ({
        ...state,
        skipped: [],
      }))
    },
    doneClear() {
      setState(state => ({
        ...state,
        done: [],
      }))
    },
  }

  return (
    <BoredStateContext.Provider value={state}>
      <BoredDispatchContext.Provider value={dispatch}>
        {children}
      </BoredDispatchContext.Provider>
    </BoredStateContext.Provider>
  )
}

BoredProvider.propTypes = {
  children: PropTypes.node,
}

function useBoredState() {
  const context = React.useContext(BoredStateContext)
  return context
}

function useBoredDispatch() {
  const context = React.useContext(BoredDispatchContext)
  return context
}

export {
  BoredProvider,
  BoredStateContext,
  BoredDispatchContext,
  useBoredState,
  useBoredDispatch,
}
