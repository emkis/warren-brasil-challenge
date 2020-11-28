export function removeAccent(targetString = '') {
  return targetString.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function formatCurrencyBRL(value = 0, usePrefix = true) {
  const withPrefixOptions = { style: 'currency', currency: 'BRL' }
  const withoutPrefixOptions = { minimumFractionDigits: 2 }

  const localeOptions = usePrefix ? withPrefixOptions : withoutPrefixOptions

  return value.toLocaleString('pt-br', localeOptions)
}

export function groupArrayByProp(propName, targetArray) {
  return targetArray.reduce((acc, currentValue) => {
    const currentProp = currentValue[propName]

    acc[currentProp] = [...(acc[currentProp] || []), currentValue]
    return acc
  }, {})
}

export function formatDateString(targetDate) {
  const [year, month, day] = targetDate.split('-')
  const parsedDate = new Date(year, month - 1, day)
  const localeOptions = { day: 'numeric', month: 'long', year: 'numeric' }

  return parsedDate.toLocaleDateString('pt-BR', localeOptions)
}

export function toggleAppScroll() {
  const appStyles = document.body.style
  const isScrollPrevented = appStyles.overflowY === 'hidden'
  const navbarSize = '15px'

  if (isScrollPrevented) {
    appStyles.overflowY = ''
    appStyles.marginRight = ''
  } else {
    appStyles.overflowY = 'hidden'
    appStyles.marginRight = navbarSize
  }
}

export function asyncDelay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
