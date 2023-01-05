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
export const safeParseInt = (a: string | undefined): number => {
  return a !== undefined ? parseInt(a) : 0
}
export const safeRegexMatch = (a: string, b: RegExp): any[] => {
  const matches = a.match(b)
  return Array.isArray(matches) ? matches : []
}
export const isIntegerStr = (a: string): boolean => {
  return a.match(REGEX_INTEGER)?.[0] === a
}
export const cleanIntegerStr = (a: string): string => {
  return stripLeadingZeros(stripSpaces(a))
}
