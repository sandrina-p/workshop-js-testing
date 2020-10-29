import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Footer from '../../playgrounds/react/components/footer'

import useBoredList from '../../playgrounds/react/state/useBoredList'

// 🍀 Import the fake
// import useBoredListFake from './__doubles__/useBoredListFake'

jest.mock('../../playgrounds/react/state/useBoredList')

describe('<Footer />', () => {
  // ... other tests ...

  it('Clicking "Clear" btn, calls the respective clear hook', () => {
    // Arrange
    const skipClearMock = jest.fn()
    const doneClearMock = jest.fn()

    // 🍀 Replace this dummy mocks with the fake.
    // The test should still pass! There's no bugs this time.
    useBoredList
      .mockImplementationOnce(() => ({
        countLabel: 1,
        reset: skipClearMock,
      }))
      .mockImplementationOnce(() => ({
        countLabel: 4,
        clear: doneClearMock,
      }))

    // 💡 How can you be sure the fake is working if you never saw
    // the test failing in first place? We must purposely break a test
    // to see it working. How ironic is that? Suggestions:
    // - In the component change the listType (ex skipped -> favorites)
    // - Pass a (unexpected) key to the hook result

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
