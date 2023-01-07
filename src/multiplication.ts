import { cleanIntegerStr, isIntegerStr } from './utils'

export const baseMultiply = (a: string, b: string): string => {
  if (!isIntegerStr(a) || !isIntegerStr(b)) {
    return ''
  }
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (_isMultiplicationSafe(intA, intB)) {
    return (intA * intB).toString()
  }
  return 'condetarace'
}

const _isMultiplicationSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a * b)
