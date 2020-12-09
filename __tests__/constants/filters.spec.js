import { filterOptions } from '@/constants'

describe('Filter Constants', () => {
  describe('filterOptions()', () => {
    it('should return array of options when called', () => {
      expect(filterOptions()).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: expect.any(String),
            value: expect.any(String),
          }),
        ])
      )
    })
  })
})
