import { formatCurrencyBRL, formatDateString } from '@/utilities/formatters'

describe('Utility Functions', () => {
  describe('Formatters', () => {
    describe('formatCurrencyBRL()', () => {
      it('should return a formatted string with BRL currency', () => {
        const value = 1560
        const formattedValue = formatCurrencyBRL(value)

        expect(formattedValue).toBe('R$\xa01.560,00')
      })

      it('should return a value formatted zero value when nothing is provided', () => {
        expect(formatCurrencyBRL()).toBe('R$\xa00,00')
      })

      it('should return a formatted BRL currency without prefix when provided false in the second argument', () => {
        const value = 2423.54
        const formattedValue = formatCurrencyBRL(value, false)

        expect(formattedValue).toBe('2.423,54')
      })
    })

    describe('formatDateString()', () => {
      it('should return a date formatted string', () => {
        expect(formatDateString('1998-03-28')).toBe('28 de março de 1998')
        expect(formatDateString('2005-10-24')).toBe('24 de outubro de 2005')
        expect(formatDateString('2020-11-28')).toBe('28 de novembro de 2020')
      })

      it('should return a invalid date when provided date string with hours', () => {
        const originalDate = '2005-10-24 04:12:23'
        const formattedDate = formatDateString(originalDate)

        expect(formattedDate).toBe('Invalid Date')
      })

      it('should return null if no argument is provided', () => {
        expect(formatDateString()).toBeNull()
      })
    })
  })
})
