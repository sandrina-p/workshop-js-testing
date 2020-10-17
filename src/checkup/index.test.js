import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

// 💡 1/3 Follow these 3 lamps to ensure your editor lint is working as expected!

describe('Try Out', () => {
  it('should test a React Component with Testing Library', () => {
    render(<h1>Hello world!</h1>)
    expect(screen.getByText('Hello world!')).toBeInTheDocument()
  })

  it('should do basic asserts correctly!', () => {
    // 💡 2/3 Your editor lint should give an error about not using toBe().
    expect(['a', 'b', 'c'].length).toBe(3)
  })

  // 💡 3/3 Your editor lint should warn about this test being skipped.
  it.skip('should skip this test', () => {
    expect(1 + 1).toBe(2)
  })
})

/*
Troubleshooting
- Restart the editor and try again.
- Do a quick Google search. (Stackoverflow helps!)
- If in less than 10min you didn't make it work, try using VSCode editor.
- Last resource... Reach out to me :D
*/
