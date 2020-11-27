export const transactionStatusEnum = Object.freeze({
  CREATED: 'created',
  PROCESSING: 'processing',
  PROCESSED: 'processed',
})

export const transactionStatusTexts = Object.freeze({
  [transactionStatusEnum.CREATED]: 'Solicitada',
  [transactionStatusEnum.PROCESSING]: 'Processando',
  [transactionStatusEnum.PROCESSED]: 'Concluída',
})

export const filterTypesEnum = Object.freeze({
  STATUS: 'status',
  TITLE: 'title',
})
