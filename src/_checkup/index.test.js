import React from 'react'
import { render, screen } from '@testing-library/react'

// 🍀 1/3 Follow these 3 lamps to ensure your editor lint is working as expected!

describe('Try Out', () => {
  it('should test a React Component with Testing Library', () => {
    render(<h1>Hello world!</h1>)
    expect(screen.getByText('Hello world!')).toBeInTheDocument()
  })

  it('should do basic asserts correctly!', () => {
    // 🍀 2/3 In the next line, your editor lint show a eslint error at "toBe".
    expect(['a', 'b', 'c'].length).toBe(3)
  })

  // 🍀 3/3 In the next line, your editor should show a eslint error about "only" usage.
  it.only('should skip this test', () => {
    expect(1 + 1).toBe(2)
  })
})

/*
# TROUBLESHOOTING
- Ensure you have both ESLint and Prettier installed.
- Restart the editor and try again.
- In VSCode, make sure the ESLint is enabled and its configs are local
- Check the logs output panel for any error.
- Do a quick Google search. (Stackoverflow helps!)
- If in less than 5min you didn't make it work, try using VSCode editor.
- Last resource... Reach out to me. A screenshot with the VSCode output logs panel is highly helpful.
*/
