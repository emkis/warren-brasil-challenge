export function formatCurrencyBRL(value = 0, usePrefix = true) {
  const withPrefixOptions = { style: 'currency', currency: 'BRL' }
  const withoutPrefixOptions = { minimumFractionDigits: 2 }

  const localeOptions = usePrefix ? withPrefixOptions : withoutPrefixOptions

  return value.toLocaleString('pt-br', localeOptions)
}

export function formatDateString(targetDate) {
  if (!targetDate) return null

  const [year, month, day] = targetDate.split('-')
  const parsedDate = new Date(year, month - 1, day)
  const localeOptions = { day: 'numeric', month: 'long', year: 'numeric' }

  return parsedDate.toLocaleDateString('pt-BR', localeOptions)
}
