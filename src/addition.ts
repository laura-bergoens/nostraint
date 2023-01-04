import { stripLeadingZeros, safeParseInt, safeRegexMatch, REGEX_POSITIVE_INTEGER } from './utils'
// Reminder:  Number.MAX_SAFE_INTEGER -> 9007199254740991
const MAX_CHARACTERS_COUNT_PER_PACKET = 15
const REGEX_FOR_SPLITTING = /.{1,15}/g

export const baseAdd = (a: string, b: string, algo: Function): string => {
  if (a.match(REGEX_POSITIVE_INTEGER)?.[0] !== a) return ''
  if (b.match(REGEX_POSITIVE_INTEGER)?.[0] !== b) return ''
  const intA = parseInt(a)
  const intB = parseInt(b)
  if (Number.isSafeInteger(intA) && Number.isSafeInteger(intB)) return (intA + intB).toString()
  return algo(stripLeadingZeros(a), stripLeadingZeros(b))
}

const _digitByDigitWithCarry = (a: string, b: string): string => {
  const largest = a.length > b.length ? a : b
  const smallest = a.length > b.length ? b : a
  let carry = 0
  let result = ''
  for (let i = largest.length - 1; i >= 0; --i) {
    const currentSum = safeParseInt(smallest[i]) + safeParseInt(largest[i]) + carry
    carry = Math.floor(currentSum / 10)
    result = `${(currentSum % 10).toString()}${result}`
  }
  result = `${carry.toString()}${result}`
  return stripLeadingZeros(result)
}

const _partialSums = (a: string, b: string): string => {
  const packetsA = safeRegexMatch(a, REGEX_FOR_SPLITTING)
  const packetsB = safeRegexMatch(b, REGEX_FOR_SPLITTING)
  const largest = packetsA.length > packetsB.length ? packetsA : packetsB
  const smallest = packetsA.length > packetsB.length ? packetsB : packetsA
  let result = ''
  let carry = 0
  for (let i = largest.length - 1; i >= 0; --i) {
    const currentSum = safeParseInt(smallest[i]) + safeParseInt(largest[i]) + carry
    let currentSumAsStr = currentSum.toString()
    if (currentSumAsStr.length > MAX_CHARACTERS_COUNT_PER_PACKET) {
      carry = parseInt(currentSumAsStr.charAt(0))
      currentSumAsStr = currentSumAsStr.substring(1)
    } else carry = 0
    result = `${currentSumAsStr}${result}`
  }
  if (carry !== 0) result = `${carry.toString()}${result}`
  return result
}

export const algorithmMapper: Record<string, Function> = {
  digitByDigitWithCarry: _digitByDigitWithCarry,
  partialSums: _partialSums
}
