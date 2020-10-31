import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { hasTextNode } from '../../playgrounds/snippets/testing'

import ActivityCard from '../../playgrounds/react/components/activity-card'

describe('<ActivityCard /> - (2.1 components)', () => {
  it('renders with minimum props', () => {
    render(
      <ActivityCard
        title="Learn Testing Library"
        participants={1}
        category="educational"
      />
    )

    screen.getByRole('article')

    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText('educational')).toBeInTheDocument()

    expect(screen.getByText('Learn Testing Library')).toBeInTheDocument()
    expect(screen.getByText('Learn Testing Library').tagName).toBe('P')

    expect(screen.getByText('For 1 person.')).toBeInTheDocument()
  })

  it('renders the title as a link, given an href', () => {
    const link = 'https://testing-library.com/'
    render(
      <ActivityCard
        title="Learn Testing Library"
        participants={3}
        category="educational"
        href={link}
      />
    )

    const title = screen.getByRole('link', { text: 'Learn Testing Library' })

    expect(title).toBeInTheDocument()
    expect(title.href).toBe(link)
    expect(title.target).toBe('_blank')

    // Or using inline snapshot

    expect(title).toMatchInlineSnapshot(`
      <a
        class="title"
        href="https://testing-library.com/"
        target="_blank"
      >
        Learn Testing Library
      </a>
    `)
  })

  it('renders "X people", given multiple participants', () => {
    render(
      <ActivityCard
        title="Learn Testing Library"
        participants={3}
        category="educational"
      />
    )

    expect(screen.getByText('For 3 people.')).toBeInTheDocument()
  })

  it('tells when the activity is free', () => {
    render(
      <ActivityCard
        title="Learn Testing Library"
        participants={3}
        category="educational"
        isFree
      />
    )

    // 💡 When a sentence is split into different nodes, Testing Library
    // can't find the sentece. A solution is using regex to look for a part,
    // and then check the parent element' text content.
    // Example using rgxexample: screen.getByText(/it's free/i)
    expect(screen.getByText(/it's free/i).parentElement.textContent).toBe(
      "For 3 people and it's free!"
    )

    // 💡 Bonus #1 Use a custom method hasTextNode
    expect(
      screen.getByText(hasTextNode("For 3 people and it's free!"))
    ).toBeInTheDocument()
  })

  describe('CTA interaction', () => {
    it('does not render any button by default', () => {
      render(
        <ActivityCard
          title="Learn Testing Library"
          participants={1}
          category="educational"
        />
      )

      const button = screen.queryByRole('button')

      expect(button).not.toBeInTheDocument()
    })

    it('renders a functional skip button, given onSkip prop', () => {
      const onSkipMock = jest.fn()
      render(
        <ActivityCard
          title="Learn Testing Library"
          participants={1}
          category="educational"
          onSkip={onSkipMock}
        />
      )

      // 💡 getByRole name gets the accessible name. When using aria-label
      // the textContent is ignored.
      const button = screen.getByRole('button', { name: "Nah, that's boring" })

      fireEvent.click(button)

      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('😴')
      expect(button).toHaveAttribute('aria-label', "Nah, that's boring")
      expect(onSkipMock).toHaveBeenCalledTimes(1)
    })

    it('renders a functional done button, given onDone prop', () => {
      const onSkipMock = jest.fn()

      render(
        <ActivityCard
          title="Learn Testing Library"
          participants={1}
          category="educational"
          onDone={onSkipMock}
        />
      )

      const button = screen.getByRole('button', { name: 'Done, what else?' })

      fireEvent.click(button)

      expect(button).toBeInTheDocument()
      expect(button.textContent).toBe('✅')
      expect(button).toHaveAttribute('aria-label', 'Done, what else?')
      expect(onSkipMock).toHaveBeenCalledTimes(1)
    })
  })
})
