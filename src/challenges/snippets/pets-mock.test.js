import { petsGuard } from '../../playgrounds/snippets/pets'

describe('pets - (1.2 Mock)', () => {
  describe('petsGuard()', () => {
    it('returns the response of given API callback and value', () => {
      // Arrange
      // 🍀 Create the mock where it returns something
      // const APIMock = jest.fn().....

      // Act
      // 🍀 Pass the mock as 2nd paratemer to APISheel
      const result = petsGuard('category')

      // Assert
      // 💡 Remember to assert both arguments and how many times a
      //    mocked fn was called. We don't want memory leaks in our code!
    })

    describe('given an array', () => {
      it.todo('calls the API multiple times with param type: family')

      // 🍀 For this one you'll need .mockReturnValueOnce
      // or to create a custom .mockImplementation
      it.todo('when the API fails it returns the error with API index')
    })
  })

  it.todo('throws Error when APICallback argument is not a function')
})

/*
eslint
  jest/no-disabled-tests: "off",
  jest/expect-expect: "off"
*/
