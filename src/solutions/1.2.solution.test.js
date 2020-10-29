import { APIshell } from '../playgrounds/snippets/1.2'

describe('1.2 methods', () => {
  describe('APIshell()', () => {
    it('calls the API with given arg, and returns its value', () => {
      const APIMock = jest.fn().mockReturnValue('OK!')

      const result = APIshell('category', APIMock)

      expect(APIMock).toHaveBeenCalledTimes(1)
      expect(APIMock).toHaveBeenCalledWith('category')
      expect(result).toBe('OK!')
    })

    describe('given an array', () => {
      it('calls the API multiple times with param type: list', () => {
        const APIMock = jest
          .fn()
          .mockImplementationOnce(() => 'okay 1')
          .mockImplementationOnce(() => 'okay 2')

        const result = APIshell(['color', 'size'], APIMock)

        expect(APIMock).toHaveBeenCalledTimes(2)
        expect(APIMock).toHaveBeenNthCalledWith(1, 'color', { type: 'list' })
        expect(APIMock).toHaveBeenNthCalledWith(2, 'size', { type: 'list' })
        expect(result).toEqual(['okay 1', 'okay 2'])
      })

      it('when the API fails it returns the error with API index', () => {
        // A: Mock using mockReturnValueOnce
        // const APIMock = jest
        //   .fn()
        //   .mockReturnValueOnce('okay 1')
        //   .mockReturnValueOnce(false)
        //   .mockReturnValueOnce('okay 3')

        // B: Mock using mockImplementation
        const APIMock = jest
          .fn()
          .mockImplementation(item => (item === 'category' ? false : 'Okay!'))

        const result = APIshell(['color', 'category', 'size'], APIMock)

        expect(APIMock).toHaveBeenCalledTimes(2)
        expect(result).toBe(`APIshell: "category" failed!`)
      })
    })
  })

  it('throws Error when APICallback argument is not a function', () => {
    expect(() => {
      APIshell()
    }).toThrow(Error('2nd parameter is required as a function'))
  })
})
