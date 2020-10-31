import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'
// 🍀 Import BoredProviderFake from BoredContextFake
// import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake'

import { sendTrack } from '../../playgrounds/snippets/metrics'
// 🍀 Import sendTrackFake from metricsFake
// import { sendTrackFake } from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')
// 🍀 Mock sendTrack with sendTrackFake

describe('useBoredList', () => {
  it('calls "sendTrack" immediately, given a listType with a length multiple of 5', () => {
    // 🍀 renderHooks also accepts "wrapper" option.
    // We'll use it to pass the wrapper provider:
    const { result } = renderHook(() => useBoredList('skipped'), {
      wrapper: props => {
        // 🍀 Replace "return null" with <BoredProviderFake>, passing a mocked state
        // You might want to review 2.2 (Context) Bonus #1 to
        // know how to use wrapper
        return null
      },
    })

    // 💡 Once done, these assertions should all pass
    expect(result.current.countLabel).toEqual(5)
    expect(sendTrack).toHaveBeenCalledTimes(1)
    expect(sendTrack).toHaveBeenCalledWith('skipped', {
      special: true,
      meta: { count: 5 },
    })
  })
})

/*
eslint
  react/display-name: "off",
  react/prop-types: "off"
*/
