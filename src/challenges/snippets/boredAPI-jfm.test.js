// 🍀 jest-fetch-mock is ready for usage!
import fetchMock from 'jest-fetch-mock'

import {
  getActivity,
  getNewActivity,
} from '../../playgrounds/snippets/boredAPI'

// 🍀 Here's some stubs ready for you to use!
import { activityStubs } from '../../playgrounds/snippets/__doubles__/boredAPIStubs'

beforeAll(() => {
  // 🍀 fetch Mocks enabled for you!
  fetchMock.enableMocks()

  // 💡 You can mock here a "happy response" in comoon for all tests.
  // Or... you can mock a response individually in each test.
  // ...

  // 🍀 To keep logs clear, here's how to mock console.debug:
  // jest.spyOn(global.console, 'debug').mockImplementation()
})

afterAll(() => {
  // 🍀  Restore fetch Mocks
  fetchMock.mockRestore()

  // 🍀 And here's how to restore debug mock.
  // jest.spyOn(global.console, 'debug').mockRestore()
})

describe('boredAPI - (1.7 - jest-fetch-mock)', () => {
  describe('getActivity()', () => {
    it('returns a random activity by default', () => {
      expect.assertions(4)

      // Arrange
      // 💡 Mock here the fetch response with a stub
      // 🍀 Mock it only once to not affect other tests

      // Act
      // 💡 Call getActivity. Don't forget to add async in it() callback ;)
      // ...

      // Assert that
      // 1/3 the fetch was called with the correct query
      // ...

      // 2/3 it returned the activity stub
      // ...

      // 3/3 the console debug was called too
      // ...
    })

    it.skip('throws an error if the fetch response is not 200 (ok)', async () => {
      expect.assertions(2)
      // Arrange
      // 💡 Mock the fetch failed.
      // 🍀 To mock a failed fetch, you need to pass status 404 to the response.
      // JSON.stringify({ error: 'UPS!' }), { status: 400 })

      // Act
      // 💡 Call the getActivity
      // ...

      // Assert
      // 💡 Assert it rejected with the error passed above!
    })

    describe('given custom args', () => {
      it.skip('accepts "participants" and "type" as query', async () => {
        // ...
      })

      it.skip('calls price=0, given price "free"', async () => {
        // ...
      })

      it.skip('calls minprice maxprice, given price "paid"', async () => {
        // ...
      })
    })
  })

  describe('getNewActivity', () => {
    it('returns an activity on 1st attempt, given a not-matching exclude', async () => {
      expect.assertions(3)
      // 💡 No help now, you can do this! :D
    })

    it('returns an activity after a few attempts, given a partial "exclude" match', async () => {
      expect.assertions(2)

      // Arrange
      // 💡 Create an exclude array with 2 different stubs. The key is unique in all stubs
      // const arrange = [stub1, stub2]

      // 💡 Mock fetch multiples times with .mockResponseOnce().
      // 🍀 Remember to pass a different stub for each mock ;)
      // ...

      // Act
      // 💡 Call getNewActivity with an exclude parameters.
      // ...

      // Assert
      // 💡 Now the assertions...
    })

    it('throwns an error, when it exceeds the maximum nr of attempts', async () => {
      // 💡 If you made the previous one, this will be a piece of cake!
      expect.assertions(2)

      // Arrange
      // ...

      // Act
      // ...

      // Assert
      // ...
      // 💡 Verify not only the reject, but also the nr of calls was the maximum
    })
  })
})
