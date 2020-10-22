import React from 'react'
import PropTypes from 'prop-types'

import { getNewActivity } from './boredAPI'

const BoredStateContext = React.createContext()
const BoredAPIContext = React.createContext()

function updateKeyArray(key, prevValue, newKey) {
  if (!key) return {}

  // ex: { 'skipped': [...[001, 123], 543] }
  return {
    [key]: [...prevValue, newKey],
  }
}

function BoredProvider({ children }) {
  const [state, setState] = React.useState(() => ({
    // latest suggested activity
    latest: null, // : @Activity
    // Array with skipped activities, by key id
    skipped: [],
    // Array with activities already done, by key id
    done: [],
  }))

  // TODO - convert this to a reducer.
  const dispatch = {
    async getNew(params, { saveLatestTo } = {}) {
      const latestKey = saveLatestTo ? state.latest?.key : null
      const exclude = [...state.skipped, ...state.done, latestKey]

      try {
        const activity = await getNewActivity(params, exclude)

        setState(state => ({
          ...state,
          latest: activity,
          ...updateKeyArray(saveLatestTo, state[saveLatestTo], latestKey),
        }))
      } catch (e) {
        setState(state => ({
          ...state,
          latest: {
            error: `Ups! ${e.message}`,
          },
          ...updateKeyArray(saveLatestTo, state[saveLatestTo], latestKey),
        }))
      }
    },
    skippedClear() {
      if (state.skipped.length === 0) return

      setState(state => ({
        ...state,
        skipped: [],
      }))
    },
    doneClear() {
      if (state.done.length === 0) return

      setState(state => ({
        ...state,
        done: [],
      }))
    },
  }

  return (
    <BoredStateContext.Provider value={state}>
      <BoredAPIContext.Provider value={dispatch}>{children}</BoredAPIContext.Provider>
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

function useBoredAPI() {
  const context = React.useContext(BoredAPIContext)
  return context
}

export { BoredProvider, BoredStateContext, useBoredState, useBoredAPI }
