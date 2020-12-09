import { transactionStatusEnum, transactionStatusTexts } from '@/constants'

export const filterStatusTypes = Object.freeze({
  ALL: '',
  ...transactionStatusEnum,
})

export const filterStatusTypeTexts = Object.freeze({
  [filterStatusTypes.ALL]: 'Todos',
  ...transactionStatusTexts,
})

export function filterOptions() {
  const filters = Object.values(filterStatusTypes)

  const formatFilter = (filterValue) => {
    const filterName = filterStatusTypeTexts[filterValue]
    return { name: filterName, value: filterValue }
  }

  return filters.map(formatFilter)
}
