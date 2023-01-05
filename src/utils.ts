const REGEX_INTEGER = /^\s*[+-]?\s*([0-9]*\s*)*$/

const stripLeadingZeros = (a: string): string => {
  const clone = a
  let { sign, number } = ['+', '-'].includes(clone.charAt(0))
    ? { sign: clone.charAt(0), number: clone.substring(1) }
    : { sign: '', number: clone }
  while (number?.[0] === '0') number = number.substring(1)
  return `${sign}${number}`
}

const stripSpaces = (a: string): string => {
  return a.replace(/\s/g, '')
}
export const safeRegexMatch = (a: string, b: RegExp): any[] => {
  const matches = a.match(b)
  return Array.isArray(matches) ? matches : ['']
}
export const isIntegerStr = (a: string): boolean => {
  return a.match(REGEX_INTEGER)?.[0] === a
}
export const cleanIntegerStr = (a: string): string => {
  return stripLeadingZeros(stripSpaces(a))
}
export const splitSignAndNumber = (a: string): { number: string, sign: string } => {
  return ['+', '-'].includes(a.charAt(0)) ? { number: a.substring(1), sign: a.charAt(0) } : { number: a, sign: '+' }
}
export const isBiggerThan = (a: string, b: string): boolean => {
  if (a.length > b.length) return true
  if (a.length < b.length) return false
  return parseInt(a[0]) > parseInt(b[0])
}
