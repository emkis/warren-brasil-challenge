import {
  transactionStatusEnum,
  transactionStatusFormattedTexts,
} from '@/constants'

export const filterStatusTypes = Object.freeze({
  ALL: '',
  ...transactionStatusEnum,
})

export const filterStatusTypesFormattedTexts = Object.freeze({
  [filterStatusTypes.ALL]: 'Todos',
  ...transactionStatusFormattedTexts,
})
