import {
  safeParseInt,
  safeRegexMatch,
  cleanIntegerStr,
  isIntegerStr
} from './utils'
// Reminder:  Number.MAX_SAFE_INTEGER -> 9007199254740991
const PARTIAL_SUMS_REGEX_FOR_SPLITTING = /.{1,15}/g

export const baseAdd = (a: string, b: string, algo: Function): string => {
  if (!isIntegerStr(a) || !isIntegerStr(b)) return ''
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (_isAdditionSafe(intA, intB)) return (intA + intB).toString()
  return algo(cleanA, cleanB)
}

const _isAdditionSafe = (a: number, b: number): boolean => {
  return Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a + b)
}

const _partialSums = (a: string, b: string): string => {
  // ignore signs for now
  const unsignedA = ['+', '-'].includes(a.charAt(0)) ? a.substring(1) : a
  const unsignedB = ['+', '-'].includes(b.charAt(0)) ? b.substring(1) : b
  const packetsA = safeRegexMatch(unsignedA, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
  const packetsB = safeRegexMatch(unsignedB, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
  const largest = packetsA.length > packetsB.length ? packetsA : packetsB
  const smallest = packetsA.length > packetsB.length ? packetsB : packetsA
  let result = ''
  let carry = 0
  while (largest.length > 0) {
    const largestPack = largest.pop()
    const smallestPack = smallest.pop()
    const maxDigitBeforeCarry = smallestPack !== undefined ? Math.max(smallestPack.length, largestPack.length) : largestPack.length
    const currentSum = safeParseInt(largestPack) + safeParseInt(smallestPack) + carry
    let currentSumAsStr = currentSum.toString()
    if (currentSumAsStr.length > maxDigitBeforeCarry) {
      carry = parseInt(currentSumAsStr.charAt(0))
      currentSumAsStr = currentSumAsStr.substring(1)
    } else carry = 0
    result = `${currentSumAsStr}${result}`
  }
  if (carry !== 0) result = `${carry.toString()}${result}`
  return result
}

export const algorithmMapper: Record<string, Function> = {
  partialSums: _partialSums
}
