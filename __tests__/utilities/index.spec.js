import { removeAccent } from '@/utilities'

describe('Utility Functions', () => {
  describe('removeAccent()', () => {
    it('should return a string without accents', () => {
      const targetString = 'Héllõ Wârrèn'
      const normalizedString = removeAccent(targetString)

      expect(normalizedString).toBe('Hello Warren')
    })

    it('should return an empty string when nothing is provided', () => {
      const normalizedString = removeAccent()
      expect(normalizedString).toBe('')
    })
  })
})
