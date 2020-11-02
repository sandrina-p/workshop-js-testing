import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import ActivityCard from '../../playgrounds/react/components/activity-card'

describe('<ActivityCard /> - (2.1 components)', () => {
  it('renders with minimum props', () => {
    expect.assertions(4) // it might be more than 4!

    // 💡 render the component passing only the minimum props

    // 💡 Assert the critical parts of the card.

    // 🍀 Use screen.debug() to debug the DOM
  })

  it('renders the title as a link, given an href', () => {
    expect.assertions(1) // it might be more than 1!

    // 💡 Now, there's no need to assert all the DOM again.
    // It's redudant. You may assert only the main difference
  })

  it.skip('renders "X people", given multiple participants')

  it.skip('tells when the activity is free', () => {})

  describe('Call To Action interactions', () => {
    it.skip('does not render any button by default', () => {})

    it('renders a functional skip button, given onSkip prop', () => {
      expect.assertions(4)

      // 💡 Asserting the skip button is only half of the job
      // Don't forget to also assert the respective prop is called
    })

    it.skip('renders a functional done button, given onDone prop')
  })
})

// ------------
