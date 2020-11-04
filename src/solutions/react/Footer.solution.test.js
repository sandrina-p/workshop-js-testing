import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import Footer from '../../playgrounds/react/components/footer'

import useBoredList from '../../playgrounds/react/state/useBoredList'
import useBoredListFake from './__doubles__/useBoredListFake.solution.js'

// 💡🍀 ATTENTION:
// - Run ONLY ONE test at the time, based on the mocking approach.
// - Only import one of the following modules:

// Approach C: Use the following line only:
// import { BoredProviderFake } from '../../playgrounds/react/state/__doubles__/BoredContextFake.js'

// Approach A and B: Use the following line only
// jest.mock('../../playgrounds/react/state/useBoredList')
jest.mock('../../playgrounds/react/state/useBoredList')

describe('<Footer />', () => {
  describe('renders a functional "Clear Done" btn', () => {
    it.only('Approach A: Dummy mocks hooks', () => {
      const skipClearMock = jest.fn()
      const doneClearMock = jest.fn()

      useBoredList
        .mockImplementationOnce(() => ({
          countLabel: 1,
          clear: skipClearMock,
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
      // sanity check that the skipped clear wasn't called
      expect(skipClearMock).toHaveBeenCalledTimes(0)
    })

    it('Approach B: useBoredListFake', () => {
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

    it('Approach C: BoredProviderFake', () => {
      // 🍀 Make sure useBoredList is NOT mocked (line ~10)
      // Arrange
      const skipClearMock = jest.fn()
      const doneClearMock = jest.fn()

      // Act
      render(
        <BoredProviderFake
          state={{
            skipped: ['001'],
            done: ['002', '003', '004', '005'],
          }}
          dispatch={{
            skippedClear: skipClearMock,
            doneClear: doneClearMock,
          }}
        >
          <Footer />
        </BoredProviderFake>
      )

      // Assert - The links are correct
      expect(
        screen.getByRole('link', { name: 'Skipped (1)' })
      ).toBeInTheDocument()

      expect(screen.getByRole('link', { name: 'Done (4)' })).toBeInTheDocument()

      // AAA #2 - Clicking "clear Done" calls clearMock
      const btnDone = screen.getByRole('button', { name: 'Clear done' })

      fireEvent.click(btnDone)

      expect(doneClearMock).toHaveBeenCalledTimes(1)
      // sanity check that the skipped clear wasn't called
      expect(skipClearMock).toHaveBeenCalledTimes(0)
    })

    // it.todo('Approach D: Real BoredProvider + "Checkup" pattern')
  })
})
