import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import ActivityCard from '../../playgrounds/react/components/activity-card'

describe('<ActivityCard />', () => {
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

  it.todo('renders the title as a link, given an href')

  it.skip('renders "* people", given multiple participants')

  it.skip('tells when the activity is free', () => {})

  describe('Call To Action interactions', () => {
    it.skip('does not render any button by default', () => {})

    it.todo('renders skip button, given onSkip prop')

    it.skip('renders done button, given onDone prop')
  })
})

// ------------

/*
eslint
  jest/no-disabled-tests: "off",
*/
