const REGEX_INTEGER = /^\s*[+-]?\s*([0-9]*\s*)*$/

const stripLeadingZeroes = (a: string): string => {
  const clone = a
  let { sign, number } = ['+', '-'].includes(clone.charAt(0))
    ? { sign: clone.charAt(0), number: clone.substring(1) }
    : { sign: '', number: clone }
  while (number?.[0] === '0') number = number.substring(1)
  return `${sign}${number.length > 0 ? number : '0'}`
}
const stripSpaces = (a: string): string => a.replace(/\s/g, '')
export const stripLeadingZeroesOnCleanUnsigned = (a: string): string => {
  let clone = a
  while (clone?.[0] === '0') clone = clone.substring(1)
  return clone.length > 0 ? clone : '0'
}
export const isIntegerStr = (a: string): boolean => a.match(REGEX_INTEGER)?.[0] === a
export const cleanIntegerStr = (a: string): string => stripLeadingZeroes(stripSpaces(a))
export const splitSignAndNumber = (a: string): { number: string, sign: string } => ['+', '-'].includes(a.charAt(0)) ? { number: a.substring(1), sign: a.charAt(0) } : { number: a, sign: '+' }
export const isBiggerThan = (a: string, b: string): boolean => {
  if (a.length > b.length) return true
  if (a.length < b.length) return false
  if (a === b) return false
  let i = 0
  while (a[i] === b[i]) ++i
  return parseInt(a[i]) > parseInt(b[i])
}
export const changeSign = (a: string): string => a.charAt(0) === '-'
  ? a.replace('-', '')
  : (a.charAt(0) === '+' ? a.replace('+', '-') : `-${a}`)
