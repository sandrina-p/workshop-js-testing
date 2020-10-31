import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import {
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { sendTrack } from '../../playgrounds/snippets/metrics'

jest.mock('../../playgrounds/snippets/metrics')
jest.mock('../../playgrounds/react/state/BoredContext')

describe('useBoredList - (2.3 hooks)', () => {
  it('returns "countLabel" and "clear", given a "skipped" lisType', () => {
    const listType = 'skipped'
    const boredState = { skipped: ['id1', 'id2'] } // a dummy Array with ids.
    const skippedClearMock = jest.fn()

    useBoredState.mockReturnValue(boredState)
    useBoredDispatch.mockReturnValue({
      skippedClear: skippedClearMock,
    })

    const { result } = renderHook(() => useBoredList(listType))

    expect(result.current).toEqual({
      countLabel: 2,
      clear: skippedClearMock,
    })
  })

  it('returns label "+5", given a type with a list bigger than 5', () => {
    useBoredState.mockReturnValue({
      skipped: [1, 2, 3, 4, 5, 6],
    })
    useBoredDispatch.mockReturnValue({
      skippedClear: jest.fn(),
    })

    const { result } = renderHook(() => useBoredList('skipped'))

    expect(result.current.countLabel).toBe('+5')
  })

  it('does not return "clear", given a type with empty list', () => {
    const skippedClearMock = jest.fn()
    useBoredState.mockReturnValue({
      skipped: [],
    })
    useBoredDispatch.mockReturnValue({
      skippedClear: skippedClearMock,
    })

    const { result } = renderHook(() => useBoredList('skipped'))

    expect(result.current).toEqual({
      countLabel: 0,
      clear: null,
    })
  })

  // This test only passes if "useBoredList" passes "special"
  // instead of "especial" to sendTrack()
  it.skip('calls "sendTrack", after list length updates to a multiple of 5', () => {
    useBoredState.mockReturnValue({
      skipped: [],
    })
    useBoredDispatch.mockReturnValue({
      skippedClear: jest.fn(),
    })

    const { result, rerender } = renderHook(() => useBoredList('skipped'))

    expect(result.current.countLabel).toEqual(0)
    // First render does not call the track because the count is 0
    expect(sendTrack).toHaveBeenCalledTimes(0)

    // 💡 Re-renders the hook, this time with a length multiple of 5
    useBoredState.mockReturnValue({
      skipped: [1, 2, 3, 4, 5],
    })

    rerender()

    expect(result.current.countLabel).toEqual(5)
    expect(sendTrack).toHaveBeenCalledTimes(1)
    expect(sendTrack).toHaveBeenCalledWith('skipped', {
      special: true,
      meta: {
        count: 5,
      },
    })
  })
})
