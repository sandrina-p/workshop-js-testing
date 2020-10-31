import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Footer from '../../playgrounds/react/components/footer'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import useBoredListFake from './__doubles__/useBoredListFake.solution.js'

jest.mock('../../playgrounds/react/state/useBoredList')

describe('<Footer />', () => {
  it('Clicking "Clear" btn, calls the respective clear hook', () => {
    // Arrange
    const skipClearMock = jest.fn()
    const doneClearMock = jest.fn()

    useBoredList
      .mockImplementationOnce(
        useBoredListFake({
          countLabel: 1,
          clear: skipClearMock,
        })
      )
      .mockImplementationOnce(
        useBoredListFake({
          countLabel: 4,
          clear: doneClearMock,
        })
      )

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
    // sanity check that the skipped clear wasn't called
    expect(skipClearMock).toHaveBeenCalledTimes(0)
  })
})
