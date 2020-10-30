import React from 'react'

import { sendTrack } from '../../snippets/metrics'
import { useBoredDispatch, useBoredState } from './BoredContext'

const listFnMap = {
  skipped: 'skippedClear',
  done: 'doneClear',
}

/**
 * Hook that returns a countLabel and clear method to control
 * a given list type
 * @typedef {"skipped" | "done" } ListType
 * @param {ListType} listType
 *
 * @example
 * Supossing the "skipped" list context has 7 items
 * const state = useBoredList('skipped')
 * state.countLabel // '+5'
 * state.clear // Function to reset the list
 */
export default function useBoredList(listType) {
  const dispatch = useBoredDispatch()
  const state = useBoredState()
  const count = state[listType].length

  React.useEffect(() => {
    // Every 5 <listType> counted, inform an external service
    if (count > 0 && count % 5 === 0) {
      sendTrack(listType, {
        meta: { count },
        especial: true,
      })
    }
  }, [count])

  const countLabel = count > 5 ? '+5' : count
  const clear = count === 0 ? null : dispatch[listFnMap[listType]]

  return { countLabel, clear }
}
