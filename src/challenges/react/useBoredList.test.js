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
    expect.assertions(1)
    const listType = 'skipped'
    const boredState = { skipped: ['id1', 'id2'] } // a dummy Array with ids.
    const skippedClearMock = jest.fn()

    // 💡 Mock useBoredState to return boredState
    // 💡 Mock useBoredDispatch to return skippedClear

    // Act
    const { result } = renderHook(() => useBoredList(listType))

    // Assert
    // 💡 Verity the current result is correct
    expect(result.current).toEqual({
      countLabel: 2,
      clear: skippedClearMock,
    })
  })

  it.skip('returns label "+5", given a type with a list bigger than 5', () => {
    // ...
  })

  it.skip('does not return "clear", given a type with empty list', () => {
    // ...
  })

  it('calls "sendTrack", when list length updates to a multiple of 5', () => {
    expect.assertions(5)
    // Arrange
    // 💡 Mock an initial empty list for "skipped"

    // Act
    // Render the hook
    const { result, rerender } = renderHook(() => useBoredList('skipped'))

    // Assert
    // 💡 Verify the list length is zero
    // 💡 Verify the sendTrack was not called because the count is 0

    // Act + Assert
    // 💡 Re-renders the hook, this time with a length multiple of 5
    // 🍀 Make sure to mock useBoredState again before the rerender

    // Assert
    // 💡 Verify the countLabel is 5 and the sendTrack was called correctly
  })
})
