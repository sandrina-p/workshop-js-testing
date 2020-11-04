import React from 'react'
import { BoredStateContext, BoredDispatchContext } from '../BoredContext'

function validateKeys(obj, messageContext) {
  const keys = Object.keys(obj)
  if (keys.length > 0) {
    throw Error(`${messageContext} · The keys "${keys}" are unexpected.`)
  }
}

export function BoredProviderFake({ state, dispatch, children }) {
  const { latest, skipped, done, ...restState } = state || {}
  const { getNew, getNewAbort, skippedClear, doneClear, ...restDispatch } =
    dispatch | {}

  validateKeys(restState, 'BoredProviderFake state')
  validateKeys(restDispatch, 'BoredProviderFake dispatch')

  const dispatchFinal = {
    ...dispatch,
    getNew(params, opts) {
      const { saveLatestTo, ...rest } = opts
      validateKeys(rest, 'BoredProviderFake dispatch.getNew opts')
      return dispatch.getNew(params, opts)
    },
  }

  return (
    <BoredStateContext.Provider value={state}>
      <BoredDispatchContext.Provider value={dispatchFinal}>
        {children}
      </BoredDispatchContext.Provider>
    </BoredStateContext.Provider>
  )
}

/* eslint
  react/prop-types: off
*/
