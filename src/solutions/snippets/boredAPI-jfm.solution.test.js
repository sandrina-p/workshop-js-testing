import fetchMock from 'jest-fetch-mock'

import {
  getActivity,
  getNewActivity,
} from '../../playgrounds/snippets/boredAPI'

import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

const activityStubbed = activityStubs.sample

beforeAll(() => {
  fetchMock.enableMocks()

  // Mock console.debug to remove it from test logs
  jest.spyOn(global.console, 'debug').mockImplementation()

  // Mock a "happy response" for all coming fetchs.
  global.fetch.mockResponse(JSON.stringify(activityStubbed))
})

afterAll(() => {
  fetchMock.mockRestore()

  jest.spyOn(global.console, 'debug').mockRestore()
})

describe('boredAPI - (1.7 - jest-fetch-mock)', () => {
  describe('getActivity()', () => {
    it.only('returns a random activity by default', async () => {
      // Act
      const result = await getActivity()

      // Assert that
      // 1/3 the fetch was called with the correct query
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.boredapi.com/api/activity/?',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'GET',
        }
      )
      // 2/3 it returned the activity stub
      expect(result).toEqual(activityStubbed)

      // 3/3 the console debug was called too
      expect(global.console.debug).toHaveBeenCalledWith(
        'ActivityAPI . fetching https://www.boredapi.com/api/activity/?'
      )
    })

    it('throws an error if the fetch response is not 200 (ok)', async () => {
      // Mock **just once** (for this scenario) that the fetch failed
      global.fetch.mockResponseOnce(JSON.stringify({ error: 'message' }), {
        status: 400,
      })

      const result = getActivity()

      await expect(result).rejects.toThrow(
        Error('Request rejected with status 400')
      )

      expect(global.fetch).toHaveBeenCalledTimes(1)
    })

    describe('given custom args', () => {
      it('accepts "participants" and "type" as query', async () => {
        const result = await getActivity({
          participants: '2',
          type: 'diy',
        })

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?type=diy&participants=2'
        )

        expect(result).toEqual(activityStubbed)
      })

      it('calls price=0, given price "free"', async () => {
        const result = await getActivity({
          price: 'free',
        })

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?price=0'
        )

        expect(result).toEqual(activityStubbed)
      })

      it('calls minprice maxprice, given price "paid"', async () => {
        const result = await getActivity({
          price: 'paid',
        })

        expect(global.fetch).toHaveBeenCalledTimes(1)
        expect(global.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?minprice=0.1&maxprice=999'
        )

        expect(result).toEqual(activityStubbed)
      })
    })
  })

  describe('getNewActivity', () => {
    it('returns an activity on 1st attempt, given a not-matching exclude', async () => {
      const result = await getNewActivity({ type: 'social' }, [])

      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch.mock.calls[0][0]).toEqual(
        'https://www.boredapi.com/api/activity/?type=social'
      )
      expect(result).toEqual(activityStubbed)
    })

    it('throwns an error, when it exceeds the maximum nr of attempts', async () => {
      const activityStubbed = activityStubs.sample
      const exclude = [activityStubbed.key]
      const attemptsMax = 5

      global.fetch.mockResponse(JSON.stringify(activityStubbed))

      const promise = getNewActivity(undefined, exclude)

      await expect(promise).rejects.toThrow('There are no new activities')

      // Assert the nr of calls to prevent possible memory leaks
      expect(global.fetch).toHaveBeenCalledTimes(attemptsMax)
    })
  })
})
