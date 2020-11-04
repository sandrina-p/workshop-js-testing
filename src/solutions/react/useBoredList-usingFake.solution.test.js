import React from 'react'
import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'

import { BoredProvider } from '../../playgrounds/react/state/BoredContext'
import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake'

import { sendTrack } from '../../playgrounds/snippets/metrics'
import { sendTrackFake } from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')
// Mock sendTrack with sendTrackFake
sendTrack.mockImplementation(sendTrackFake)

// 💡 ATTENTION: These tests will fail unless "useBoredList"
// passes "special" instead of "especial" to sendTrack()
describe.skip('useBoredList - (2.3 hooks - BoredProviderFake)', () => {
  it('calls "sendTrack" immediately, given a listType with size multiple of 5', () => {
    // 💡 renderHooks also accepts "wrapper" option.
    // Use it to pass the wrapper provider
    const { result } = renderHook(() => useBoredList('skipped'), {
      wrapper: props => (
        <BoredProviderFake
          state={{
            skipped: ['01', '02', '03', '04', '05'],
          }}
          {...props}
        />
      ),
    })

    expect(result.current.countLabel).toEqual(5)
    expect(sendTrack).toHaveBeenCalledTimes(1)
    expect(sendTrack).toHaveBeenCalledWith('skipped', {
      data: {
        count: 5,
      },
      special: true,
    })
  })
})

describe.skip('useBoredList - (2.3 hooks - BoredProvider)', () => {
  // 🍀 Whenever possible, use the original context.
  // In this case, it's possible to pass a default value,
  // so we can take advantage from it.
  it('returns "countLabel" and "clear", given a "skipped" lisType - (original Context)', () => {
    const { result } = renderHook(() => useBoredList('skipped'), {
      wrapper: props => (
        <BoredProvider
          value={{
            skipped: ['1', '2'],
          }}
          {...props}
        />
      ),
    })

    expect(result.current).toEqual({
      countLabel: 2,
      // We don't need to assert the exact function
      clear: expect.any(Function),
    })

    // 🍀 This type of assertions might get a little too far.
    // A tiny white-box test smell (aka implementation details)
    expect(result.current.clear.name).toBe('skippedClear')
  })
})

/*
eslint
  react/display-name: "off",
  react/prop-types: "off"
*/
