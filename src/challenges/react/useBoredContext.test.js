import { renderHook } from '@testing-library/react-hooks'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import {
  useBoredState,
  useBoredDispatch,
} from '../../playgrounds/react/state/BoredContext'

import { sendTrack } from '../../playgrounds/snippets/metrics'

// 🍀 This hook has some dependencies:
// - First, the metric "sendTrack": It's irrelevant, so we can just mock them:
// jest.mock('../../playgrounds/snippets/metrics')
// - Then, the BoredContext. For the purpose of this challenge we'll mock it too.
//   Don't worry, later on we'll discuss other approaches. For now, let's just
//   focus on learning how to use testing-librar/react-hooks.
// jest.mock('../../playgrounds/react/state/BoredContext')

describe('useBoredList', () => {
  it('returns "countLabel" and "clear", given a "skipped" lisType', () => {
    // Arrange
    const listType = 'skipped'
    const boredState = { skipped: ['id1', 'id2'] } // a dummy Array with ids.

    // 🍀 For useBoredState and useBoredDispatch hooks,
    // 💡 You can use .mockReturnValue() for each one
    // 💡 jest.fn() can be used inside a mocked implementation (useful
    // to assert the value of the "clear" key)

    // Act
    // 🍀 Call the hook using renderHook with the listType

    // Assert
    // 🍀 Verify that both countLabel and clear keys are as expected.
  })

  it.skip('returns label "+5", given a type with a list bigger than 5', () => {})

  it.skip('does not return "clear", given a type with empty list', () => {})

  it('calls "sendTrack" when the list size changes to multiples of 5', () => {
    // 💡 To ensure the life cycle works as expect (useEffect)
    // remember to use "rerender" so the hook is render twice:
    // 1st - Render with an empty Array [] - the sendTrack is not called
    // 2nd - Render with an Array of 5. - the sendTrack is called!
    // This will be a A-AA-AA cycle, when we'll act and assert multiple times.

    // Arrange
    const listType = 'skipped'
    const boredState = { skipped: [] }
    // 🍀 Mock both hooks again for the first assertion
    // ...

    // Act
    // 🍀 Render the hook. Remember to extract both { result, renrender }
    // ...

    // Assert
    // 🍀 Verify sendTrack was not called
    // ...

    // Arrange #2
    const boredStateFive = { skipped: ['id1', 'id2', 'id3', 'id4', 'id5'] }
    // 🍀 Re-mock the useBoredState, this time with an Array of 5
    // ...

    // Act #2
    // 🍀 Call rerender!
    // ...

    // Expect #2
    // 🍀 Final assertions. The sendTrack was called and the count is correct!
    // ...
  })
})

/*
eslint
  jest/expect-expect: "off"
*/
