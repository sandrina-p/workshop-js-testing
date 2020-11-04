import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Footer from '../../playgrounds/react/components/footer'

import useBoredList from '../../playgrounds/react/state/useBoredList'

// 💡 The fakers you might need

// import useBoredListFake from './__doubles__/useBoredListFake'
// import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake.js'

jest.mock('../../playgrounds/react/state/useBoredList')

describe('<Footer />', () => {
  // ... other tests ...

  describe('given a "done" and "skipped" lists', () => {
    it.only('renders a functional "Clear Done" btn', () => {

    // Arrange
    const skipClearMock = jest.fn()
    const doneClearMock = jest.fn()

    // 💡 Replace this dummy mocks with something better.
    // The test should still pass! There's no bugs this time.
    // Will you use a useBoredListFake or BoredProviderFake?
    useBoredList
      .mockImplementationOnce(() => ({
        countLabel: 1,
        reset: skipClearMock,
      }))
      .mockImplementationOnce(() => ({
        countLabel: 4,
        clear: doneClearMock,
      }))


    // Act
    render(<Footer />)

    // Assert - The links are correct
    expect(
      screen.getByRole('link', { name: 'Skipped (1)' })
    ).toBeInTheDocument()

    expect(screen.getByRole('link', { name: 'Done (4)' })).toBeInTheDocument()

    // AAA #2 - Clicking clear (done) calls clearMock
    const btnDone = screen.getByRole('button', { name: 'Clear done' })

    fireEvent.click(btnDone)

    expect(doneClearMock).toHaveBeenCalledTimes(1)
    // sanity check that the skipped clear wasn't called my mistake
    expect(skipClearMock).toHaveBeenCalledTimes(0)
  })
})