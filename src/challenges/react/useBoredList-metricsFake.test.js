import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import {
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { sendTrack } from '../playgrounds/snippets/metrics'
// 🍀 Import the metrics modules
// import { sendTrackFake } from '../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../playgrounds/snippets/metrics')
jest.mock('../../playgrounds/react/state/BoredContext')

// 🍀 Use sendTrackFake as mocked implementation of sendTrack.

describe('useBoredList', () => {
  // 🍀 Once that's done, the test will fail. Go ahead and fix the bug!
  it('calls "sendTrack" immediately, given a listType with a length multiple of 5', () => {
    useBoredState.mockReturnValue({
      skipped: [1, 2, 3, 4, 5],
    })
    useBoredDispatch.mockReturnValue({
      skippedClear: jest.fn(),
    })

    const { result } = renderHook(() => useBoredList('skipped'))

    expect(result.current.countLabel).toEqual(5)

    expect(sendTrack).toHaveBeenCalledTimes(1)
    expect(sendTrack).toHaveBeenCalledWith('skipped', {
      especial: true,
      meta: { count: 5 },
    })
  })
})
