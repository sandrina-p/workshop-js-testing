import { rest } from 'msw'
import { setupServer } from 'msw/node'

// whatwg-fetch replicates fetch (a browser feature) in a Node env
import 'whatwg-fetch'

import {
  getActivity,
  // getNewActivity,
} from '../../playgrounds/snippets/boredAPI'

import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

// ----
// 💡 Configure msw for this file. It can be done globally at jest.setup.js
// Setup a mocked server with an "happy path" URL
const server = setupServer(
  // regex can be used to cover similar paths.
  // The following regex covers URL like:
  // - boredapi.com/api/activity
  // - boredapi.com/api/activity?type=diy
  // - www.boredapi.com/api/activity?type=diy
  rest.get(/boredapi.com\/api\/activity/, (req, res, ctx) => {
    return res(ctx.status(200, 'Mocked status'), ctx.json(activityStubs.sample))
  })
)

// Start the mocked server before tests
beforeAll(() => server.listen())
// Reset all handlers (eg fetch get) to ensure test isolations
afterEach(() => server.resetHandlers())
// Don't forget to shutdown the mocked server afterwards
afterAll(() => server.close())
// ----

describe('boredAPI - (1.7 - msw)', () => {
  describe('getActivity', () => {
    const consoleOriginal = global.console
    const activityStubbed = activityStubs.sample

    beforeAll(() => {
      // This time we spy on fetch, because it wasn't mocked.
      jest.spyOn(window, 'fetch')
      global.console.debug = jest.fn()
    })

    afterAll(() => {
      global.console.debug = consoleOriginal.debug
    })

    it('returns a random activity by default', async () => {
      const result = await getActivity()

      expect(window.fetch).toHaveBeenCalledTimes(1)
      expect(window.fetch.mock.calls[0][0]).toEqual(
        'https://www.boredapi.com/api/activity/?'
      )

      expect(result).toEqual(activityStubbed)

      expect(global.console.debug).toHaveBeenCalledWith(
        'ActivityAPI . fetching https://www.boredapi.com/api/activity/?'
      )
    })

    it('throws an error if the fetch response is not 200 (ok)', async () => {
      server.use(
        rest.get(/boredapi.com\/api\/activity/, async (req, res, ctx) => {
          return res(
            ctx.status(400),
            ctx.json({
              errorMessage: `Activity not found`,
            })
          )
        })
      )

      const result = getActivity()

      await expect(result).rejects.toThrow(
        Error('Request rejected with status 400')
      )
      expect(window.fetch).toHaveBeenCalledTimes(1)
    })

    describe('given custom args', () => {
      it('accepts "participants" and "type" as query', async () => {
        const result = await getActivity({
          participants: '2',
          type: 'diy',
        })

        expect(window.fetch).toHaveBeenCalledTimes(1)
        expect(window.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?type=diy&participants=2'
        )

        expect(result).toEqual(activityStubbed)
      })

      it('calls price=0, given price "free"', async () => {
        const result = await getActivity({
          price: 'free',
        })

        expect(window.fetch).toHaveBeenCalledTimes(1)
        expect(window.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?price=0'
        )

        expect(result).toEqual(activityStubbed)
      })

      it('calls minprice maxprice, given price "paid"', async () => {
        const result = await getActivity({
          price: 'paid',
        })

        expect(window.fetch).toHaveBeenCalledTimes(1)
        expect(window.fetch.mock.calls[0][0]).toEqual(
          'https://www.boredapi.com/api/activity/?minprice=0.1&maxprice=999'
        )

        expect(result).toEqual(activityStubbed)
      })
    })
  })

  describe('getNewActivity', () => {
    it.todo('returns an activity on 1st attempt, given a not-matching exclude')

    it.todo('returns an activity after X attempts, given a matching exclude')

    it.todo('throwns an error, when it exceeds the maximum nr of attempts')
  })
})
