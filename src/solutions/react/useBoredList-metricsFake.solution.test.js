import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import {
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { sendTrack } from '../../playgrounds/snippets/metrics'
import { sendTrackFake } from '../../playgrounds/snippets/__doubles__/metricsFake'

jest.mock('../../playgrounds/snippets/metrics')
jest.mock('../../playgrounds/react/state/BoredContext')

sendTrack.mockImplementation(sendTrackFake)

describe('useBoredList', () => {
  // 💡 This test solution only work once the useBoredList hook
  // is updated. Go there and change "especial" to "special")
  // Finally, uncomment the code bellow and run the tests again
  it.skip('calls "sendTrack" immediately, given a listType with a length multiple of 5', () => {
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
      special: true,
      meta: { count: 5 },
    })
  })
})
