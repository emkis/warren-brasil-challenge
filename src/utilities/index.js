export function removeAccent(targetString = '') {
  return targetString.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function groupArrayByProp(propName, targetArray) {
  return targetArray.reduce((acc, currentValue) => {
    const currentProp = currentValue[propName]

    acc[currentProp] = [...(acc[currentProp] || []), currentValue]
    return acc
  }, {})
}

export function toggleAppScroll() {
  const appStyles = document.body.style
  const isScrollPrevented = appStyles.overflowY === 'hidden'

  if (isScrollPrevented) appStyles.overflowY = ''
  else appStyles.overflowY = 'hidden'
}

export function asyncDelay(ms = 1000) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
