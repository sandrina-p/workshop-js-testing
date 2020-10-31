import React from 'react'
import PropTypes from 'prop-types'

import { getNewActivity } from '../../snippets/boredAPI'

const BoredStateContext = React.createContext()
const BoredDispatchContext = React.createContext()

function updateList(name, prevValue, newKey) {
  if (!newKey) return {}

  // ex: { 'skipped': [...[001, 123], 543] }
  return {
    [name]: [...prevValue, newKey],
  }
}

function BoredProvider({ children, value }) {
  const [state, setState] = React.useState(() => ({
    // latest suggested activity
    // rename latest to activity
    latest: null, // : @Activity
    // List with activities already done, by keyId
    done: [],
    // List with skipped activities, by keyId
    skipped: [],
    ...value,
  }))

  const dispatch = {
    async getNew(query, opts = {}) {
      const latestKey = state.latest?.key
      const saveLatestTo = opts.saveLatestTo || 'skipped'
      const exclude = [...state.skipped, ...state.done]
      if (latestKey) exclude.push(latestKey)

      let latest
      try {
        latest = await getNewActivity(query, exclude)
      } catch (e) {
        latest = {
          error: `Ups! ${e.message}`,
        }
      }

      setState(state => ({
        ...state,
        latest,
        ...updateList(saveLatestTo, state[saveLatestTo], latestKey),
      }))
    },
    doneClear() {
      setState(state => ({
        ...state,
        done: [],
      }))
    },
    skippedClear() {
      setState(state => ({
        ...state,
        skipped: [],
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
  value: PropTypes.shape({
    latest: PropTypes.object,
    skipped: PropTypes.arrayOf(PropTypes.string),
    done: PropTypes.arrayOf(PropTypes.string),
  }),
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
