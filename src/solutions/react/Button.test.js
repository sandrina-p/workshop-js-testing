import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Button from '../../playgrounds/react/components/form/button'

describe('<button> - briefing example', () => {
  afterEach(() => {
    // Cleanup the DOM between each test.
    // NOTE: When testing React components, it's done automagically for you!
    document.body.innerHTML = null
  })

  it('the button is disabled (DOM)', () => {
    document.body.innerHTML = '<button disabled>Hello world<button>'

    // Use "screen" to access the document.body. It comes with every TL query
    const button = screen.getByText('Hello world')

    // The result from a query is a DOM element. You can access
    // it as you would do normally and assert it with Jest
    expect(button.getAttribute('disabled')).toBe('')

    // Using jest-dom we can use simplified queries.
    // It's imported at jest.config.js, to be used globally
    expect(button).toBeDisabled()
  })

  const Button = ({ children, isDisabled }) => (
    <button disabled={isDisabled}>{children}</button>
  )

  it('the button is disabled (React)', () => {
    // render appends the component DOM to the document.body
    render(<Button isDisabled>Hello world</Button>)

    // Quering nodes is the same as the core.
    const button = screen.getByText('Hello world')

    expect(button).toBeDisabled()
  })
})

describe('<Button />', () => {
  // 💡 Start the tests with the simplest/minimum usage

  it('renders with minimum usage - manual assertions', () => {
    render(<Button>Sign up</Button>)

    // 💡 Manual assertions are easy to read, but verbose and limited.
    // If something new is added it can be easily missed.
    const button = screen.getByRole('button')
    expect(button.type).toBe('button')
    expect(button.className).toBe('button size-md variant-solid')
    expect(button.textContent).toBe('Sign up')
  })

  it('renders with minimum props - inlineSnapshots', () => {
    render(<Button>Sign up</Button>)

    // 💡 Snapshots is a powerful weapon that can be totally missused
    // Prefer SHORT (max 5-10 lines) and inline snapshots.
    // It saves you from manual assertions while checking for the "whole DOM"
    expect(screen.getByRole('button')).toMatchInlineSnapshot(`
      <button
        class="button size-md variant-solid"
        type="button"
      >
        Sign up
      </button>
    `)
  })

  it('spreads down custom attributes and event listeners', () => {
    const clickMock = jest.fn()
    render(
      <Button data-super="123" onClick={clickMock}>
        Sign up
      </Button>
    )

    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(button.getAttribute('data-super')).toBe('123')

    expect(clickMock).toHaveBeenCalledTimes(1)
    // 💡 Verify the clickMock was called with anything to give
    // a minimum safety that the event listener is passed
    expect(clickMock).toHaveBeenCalledWith(expect.anything())
  })

  it('renders attr aria-pressed correctly based on isActive', () => {
    // 💡 It's okay to have a test with a A-AA-AA cycle, (multiple acts/assertions)
    // when they are related and make sense together.

    // Act + Assert without isActive
    const { rerender } = render(<Button>Sign up</Button>)

    expect(screen.getByRole('button')).not.toHaveAttribute('aria-pressed')

    // Act + Assert isActive=false
    rerender(<Button isActive={false}>Sign up</Button>)
    // 💡 Using *ByRole query it's possible to look for certain attributes directly
    expect(screen.getByRole('button', { pressed: false })).toBeInTheDocument()

    // Act + Assert isActive=true
    rerender(<Button isActive>Sign up</Button>)

    expect(screen.getByRole('button', { pressed: true })).toBeInTheDocument()
  })

  describe('Button theming', () => {
    it('merges a custom class with existing classes', () => {
      render(<Button className="super">Sign up</Button>)

      const button = screen.getByRole('button')

      expect(button.className).toContain('super')
      // 💡 Or more robust, ensure it contains both, to prevent overrides
      // expect(button.className).toBe('button super')
    })

    it('given size and variant, it rendes the right classes', () => {
      render(
        <Button size="sm" variant="outline">
          Sign up
        </Button>
      )

      const button = screen.getByRole('button')

      expect(button.className).toContain('size-sm variant-outline')
    })

    it('given an icon, it replaces the children', () => {
      render(<Button icon="✅" aria-label="Done!"></Button>)

      const button = screen.getByRole('button')

      expect(button.textContent).toBe('✅')
      expect(button.getAttribute('aria-label')).toBe('Done!')
    })

    it('throws a console warning, given an icon without aria-label', () => {
      const consoleOriginal = global.console

      global.console = {
        warn: jest.fn(),
      }

      render(<Button icon="✅"></Button>)

      expect(global.console.warn).toHaveBeenCalledTimes(1)
      expect(global.console.warn).toHaveBeenCalledWith(
        'Button with icon ✅ must have "aria-label" for accessibility'
      )

      // 💡  Remember to restore the console so that it works in other tests
      global.console = consoleOriginal
    })
  })
})

/*
eslint
  react/prop-types: "off"
*/
