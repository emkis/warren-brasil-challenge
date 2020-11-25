export function removeAccent(targetString = '') {
  return targetString.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}
