import React from 'react'
import {
  fireEvent,
  render,
  screen,
  within,
  waitForElementToBeRemoved,
} from '@testing-library/react'

import { BoredProvider } from '../../playgrounds/react/state/BoredContext'
import Root from '../../playgrounds/Bored'

import { getNewActivity } from '../../playgrounds/react/state/boredAPI'
import { activityStub } from '../../playgrounds/react/state/__doubles__/boredAPIStubs'

jest.mock('../../playgrounds/react/state/boredAPI')

async function doGetAnotherActivity({ btnName }) {
  const btnDone = screen.getByRole('button', {
    name: btnName,
  })

  fireEvent.click(btnDone)

  await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))
}

describe('<Root />', () => {
  it('renders the default layout', () => {
    render(
      <BoredProvider>
        <Root />
      </BoredProvider>
    )

    expect(
      screen.getByRole('button', { name: 'Get random activity' })
    ).toBeInTheDocument()
  })

  describe('when an activity is skipped or done', () => {
    it('updates the respective list links', async () => {
      getNewActivity
        .mockResolvedValue(activityStub.basic)
        .mockResolvedValueOnce(activityStub.withLink)
        .mockResolvedValueOnce(activityStub.pricePaid)
        .mockResolvedValueOnce(activityStub.with2people)

      render(
        <BoredProvider>
          <Root />
        </BoredProvider>
      )

      // Get initial activity
      const CTA = screen.getByRole('button', { name: 'Get random activity' })
      fireEvent.click(CTA)

      await waitForElementToBeRemoved(() => screen.queryByText('Looking...'))
      // Initially both link are at zero.
      expect(screen.getByText('Skipped (0)')).toBeInTheDocument()
      expect(screen.getByText('Done (0)')).toBeInTheDocument()

      // Act + Assert #1 - Skipping increases its link count by 1
      await doGetAnotherActivity({ btnName: "Nah, that's boring" })
      expect(screen.getByText('Skipped (1)')).toBeInTheDocument()

      // Act + Assert #2 - Skipping again, increases it to 2
      await doGetAnotherActivity({ btnName: "Nah, that's boring" })
      expect(screen.getByText('Skipped (2)')).toBeInTheDocument()

      // #sanity - the Done link is still at zero
      expect(screen.getByText('Done (0)')).toBeInTheDocument()

      // Act + Assert #3 - Marking as done increases its link count to 1
      await doGetAnotherActivity({ btnName: 'Done, what else?' })
      expect(screen.getByText('Done (1)')).toBeInTheDocument()

      // Act + Assert - Clearning the Skipped links resets its count
      const linkItem = screen.getByText('Skipped (2)').parentElement
      const linkClear = within(linkItem).getByRole('button', { name: 'Clear' })

      fireEvent.click(linkClear)

      expect(screen.getByText('Skipped (0)')).toBeInTheDocument()
      // #sanity - the Done link is still the same.
      expect(screen.getByText('Done (1)')).toBeInTheDocument()
    })
  })
})
