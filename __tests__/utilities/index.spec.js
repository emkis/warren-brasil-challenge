import { removeAccent, formatCurrencyBRL } from '@/utilities'

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

  describe('formatCurrencyBRL()', () => {
    it('should return a formatted string with BRL currency', () => {
      const value = 1560
      const formattedValue = formatCurrencyBRL(value)

      expect(formattedValue).toBe('R$\xa01,560.00')
    })

    it('should return a value formatted zero value when nothing is provided', () => {
      expect(formatCurrencyBRL()).toBe('R$\xa00.00')
    })

    it('should return a formatted BRL currency without prefix when provided false in the second argument', () => {
      const value = 2423.54
      const formattedValue = formatCurrencyBRL(value, false)

      expect(formattedValue).toBe('2,423.54')
    })
  })
})
