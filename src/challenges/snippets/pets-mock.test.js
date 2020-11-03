import { petsGuard } from '../../playgrounds/snippets/pets'

describe('pets - (1.2 Mock)', () => {
  describe('petsGuard()', () => {
    it('returns the response of given API callback and value', () => {
      expect.assertions(3)

      // Arrange
      // 💡 Create the mock where it returns something
      // const APIMock = jest.fn().....

      // Act
      // 💡 Pass the mock as 2nd paratemer to APISheel
      // const result = petsGuard('category')

      // Assert
      // 🍀 Remember to assert the argument and how many times a
      //    mocked fn was called. We don't want memory leaks in our code!
    })

    describe('given an array', () => {
      it('calls the API multiple times with param type: family', () => {
        expect.assertions(3)
      })

      it('returns the error with API index, when the API fails', () => {
        // 💡 For this one you'll need .mockReturnValueOnce
        // or to create a custom .mockImplementation
        expect.assertions(2)
      })
    })
  })

  it('throws Error when APICallback argument is not a function', () => {
    expect.assertions(1)
    // ...
  })
})
