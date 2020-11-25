export function removeAccent(targetString = '') {
  return targetString.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function formatCurrencyBRL(value = 0, usePrefix = true) {
  const withPrefixOptions = { style: 'currency', currency: 'BRL' }
  const withoutPrefixOptions = { minimumFractionDigits: 2 }

  const localeOptions = usePrefix ? withPrefixOptions : withoutPrefixOptions

  return value.toLocaleString('pt-br', localeOptions)
}
