export function isObject(valueToCheck) {
  const toStringResult = Object.prototype.toString
    .call(valueToCheck)
    .toLowerCase()
    .replace(/[[\]']/g, '')
    .split(' ')[1]

  return toStringResult.includes('object')
}
