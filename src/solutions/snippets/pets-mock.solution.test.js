import { petsGuard } from '../../playgrounds/snippets/pets'

describe('pets - (1.2 mocks)', () => {
  describe('petsGuard()', () => {
    it('calls the API with given arg, and returns its value', () => {
      const APIMock = jest.fn().mockReturnValue('Ok!')

      const result = petsGuard('category', APIMock)

      expect(APIMock).toHaveBeenCalledTimes(1)
      expect(APIMock).toHaveBeenCalledWith('category')
      expect(result).toBe('Ok!')
    })

    describe('given an array', () => {
      it('calls the API multiple times with param type: family', () => {
        const APIMock = jest
          .fn()
          .mockReturnValueOnce('okay 1')
          .mockReturnValueOnce('okay 2')

        const result = petsGuard(['color', 'size'], APIMock)

        expect(APIMock).toHaveBeenCalledTimes(2)
        expect(APIMock).toHaveBeenNthCalledWith(1, 'color', { type: 'family' })
        expect(APIMock).toHaveBeenNthCalledWith(2, 'size', { type: 'family' })
        expect(result).toEqual(['okay 1', 'okay 2'])
      })

      it('when the API fails it returns the error with API index', () => {
        // A: Mock using mockReturnValueOnce
        // 🍀 More verbose, but easily understood
        const APIMock = jest
          .fn()
          .mockReturnValueOnce('okay 1')
          .mockReturnValueOnce(false)
          .mockReturnValueOnce('okay 3')

        // B: Mock using mockImplementation
        // 💡 More dynamic but might be harder to understand
        // const APIMock = jest
        //   .fn()
        //   .mockImplementation(item => (item === 'category' ? false : 'Okay!'))

        const result = petsGuard(['color', 'category', 'size'], APIMock)

        expect(APIMock).toHaveBeenCalledTimes(2)
        expect(result).toBe(`petsGuard: "category" failed!`)
      })
    })
  })

  it('throws Error when APICallback argument is not a function', () => {
    expect(() => {
      petsGuard()
    }).toThrow(Error('2nd parameter is required as a function'))
  })
})
