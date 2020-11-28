import { isObject } from '@/utilities/checkers'

describe('Utility Functions', () => {
  describe('Checkers', () => {
    describe('isObject()', () => {
      it('should return true if argument is type Object', () => {
        const valueToTest = {}
        expect(isObject(valueToTest)).toBe(true)
      })

      it('should return false if argument is not an object', () => {
        const valueToTest = [1, 2, 3]
        expect(isObject(valueToTest)).toBe(false)
      })

      it('should return false if argument is empty', () => {
        expect(isObject()).toBe(false)
      })
    })
  })
})
