import React from 'react'
import { useBoredAPI, useBoredState } from './BoredContext'
import { sendTrack } from '../utils/metrics'

const typeClearFn = {
  skipped: 'skippedClear',
  done: 'doneClear',
}

export default function useActivityCounter(type) {
  const API = useBoredAPI()
  const state = useBoredState()
  const count = state[type].length

  React.useEffect(() => {
    // Every 5 "type" saved, inform some external analytic metrics
    if (count % 5 === 0) {
      sendTrack(type, { count })
    }
  }, [count])

  const countLabel = count > 5 ? '+5' : count
  const clearFn = count === 0 ? null : API[typeClearFn[type]]

  return [countLabel, clearFn]
}
