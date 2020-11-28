import { groupArrayByProp, removeAccent, toggleAppScroll } from '@/utilities'

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

  describe('groupArrayByProp()', () => {
    const originalArray = [
      { name: 'Lorem Ipsum', age: 1200 },
      { name: 'Nicolas Jardim', age: 22 },
      { name: 'Jodie Osinski', age: 22 },
      { name: 'Jane Doe', age: 26 },
      { name: 'Una Abshire', age: 22 },
      { name: 'Whitney Tromp', age: 26 },
    ]

    it('should return an object with keys for each "age" and a list with each item that also has that "age"', () => {
      const expectedObject = {
        1200: [{ name: 'Lorem Ipsum', age: 1200 }],
        22: [
          { name: 'Nicolas Jardim', age: 22 },
          { name: 'Jodie Osinski', age: 22 },
          { name: 'Una Abshire', age: 22 },
        ],
        26: [
          { name: 'Jane Doe', age: 26 },
          { name: 'Whitney Tromp', age: 26 },
        ],
      }

      const groupedArray = groupArrayByProp('age', originalArray)
      expect(groupedArray).toMatchObject(expectedObject)
    })

    it('should return an object with keys for each "name" and a list with each item that also has that "name"', () => {
      const expectedObject = {
        'Lorem Ipsum': [{ name: 'Lorem Ipsum', age: 1200 }],
        'Nicolas Jardim': [{ name: 'Nicolas Jardim', age: 22 }],
        'Jodie Osinski': [{ name: 'Jodie Osinski', age: 22 }],
        'Una Abshire': [{ name: 'Una Abshire', age: 22 }],
        'Jane Doe': [{ name: 'Jane Doe', age: 26 }],
        'Whitney Tromp': [{ name: 'Whitney Tromp', age: 26 }],
      }

      const groupedArray = groupArrayByProp('name', originalArray)
      expect(groupedArray).toMatchObject(expectedObject)
    })

    it('should return null if no arguments is provided', () => {
      expect(groupArrayByProp()).toBeNull()
    })
  })

  describe('toggleAppScroll()', () => {
    it('should add inline style to prevent overflow when executed', () => {
      const beforeCallDocumentStyles = document.body.style.overflowY
      toggleAppScroll()
      const afterCallDocumentStyles = document.body.style.overflowY

      expect(beforeCallDocumentStyles).toBe('')
      expect(afterCallDocumentStyles).toBe('hidden')
    })

    it('should remove the inline styles if they already exists', () => {
      toggleAppScroll()
      const pageStyles = document.body.style

      expect(pageStyles.overflowY).toBe('')
    })

    it('should toggle inline styles when executed twice', () => {
      const beforeCallDocumentStyles = document.body.style.overflowY
      toggleAppScroll()
      const afterCallDocumentStyles = document.body.style.overflowY

      expect(beforeCallDocumentStyles).toBe('')
      expect(afterCallDocumentStyles).toBe('hidden')
    })
  })
})
