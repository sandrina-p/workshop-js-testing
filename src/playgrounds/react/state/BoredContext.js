import React from 'react'
import PropTypes from 'prop-types'

import { getNewActivity } from '../../snippets/boredAPI'

const BoredStateContext = React.createContext()
const BoredDispatchContext = React.createContext()

function updateList(name, currentKeys, newKey) {
  if (!newKey) return {}
  return {
    [name]: [...currentKeys, newKey],
  }
}

function BoredProvider({ children, value }) {
  const isMounted = React.useRef(false)

  const [state, setState] = React.useState(() => ({
    // latest suggested activity
    latest: null, // @Activity
    // List with activities already done, by keyId
    done: [],
    // List with skipped activities, by keyId
    skipped: [],
    // A custom initial state
    ...value,
  }))
  React.useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  const dispatch = {
    async getNew(
      params,
      opts = {
        saveLatestTo: 'skipped',
      }
    ) {
      const saveLatestTo = opts.saveLatestTo
      const latestKey = state.latest?.key
      const exclude = [...state.skipped, ...state.done]

      if (latestKey) exclude.push(latestKey)

      let latest

      try {
        latest = await getNewActivity(params, exclude)
      } catch (e) {
        latest = {
          error: `Ups! ${e.message}`,
        }
      }

      if (!isMounted.current) {
        return
      }

      setState(state => ({
        ...state,
        latest,
        ...updateList(saveLatestTo, state[saveLatestTo], latestKey),
      }))
    },
    getNewAbort() {
      console.log('getNewActivity() request aborted!')
      // TODO - I ran out of time. But you get the idea ;)
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
