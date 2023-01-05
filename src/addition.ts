import {
  safeParseInt,
  safeRegexMatch,
  cleanIntegerStr,
  isIntegerStr,
  splitSignAndNumber,
  isBiggerThan
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
  const { number: numberA, sign: signA } = splitSignAndNumber(a)
  const { number: numberB, sign: signB } = splitSignAndNumber(b)
  if (signA === '+' && signB === '+') return _partialSumsAllPositive(numberA, numberB)
  if (signA === '-' && signB === '-') return _partialSumsAllNegative(numberA, numberB)
  if (signA === '-') return _partialSumsMixed(numberA, numberB)
  return _partialSumsMixed(numberB, numberA)
}

const _partialSumsAllPositive = (a: string, b: string): string => {
  const packetsA = safeRegexMatch(a, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
  const packetsB = safeRegexMatch(b, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
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

const _partialSumsAllNegative = (a: string, b: string): string => {
  return `-${_partialSumsAllPositive(a, b)}`
}

const _partialSumsMixed = (neg: string, pos: string): string => {
  if (neg === pos) return '0'
  const finalSign = isBiggerThan(neg, pos) ? '-' : '+'
  const packetsNeg = safeRegexMatch(neg, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
  const packetsPos = safeRegexMatch(pos, PARTIAL_SUMS_REGEX_FOR_SPLITTING)
  let result = ''
  let carry = 0
  while (packetsNeg.length > 0 || packetsPos.length > 0) {
    let negative = packetsNeg.pop()
    let positive = packetsPos.pop()
    negative = negative === undefined ? '0' : negative
    positive = positive === undefined ? '0' : positive
    const maxDigitBeforeCarry = Math.max(negative.length, positive.length)
    const inter = Array(maxDigitBeforeCarry).fill('0')
    inter.unshift('1')
    const offset = parseInt(inter.join(''))
    let currentSum = parseInt(positive) - parseInt(negative) + carry
    if ((finalSign === '-' && currentSum <= 0) || (finalSign === '+' && currentSum >= 0)) carry = 0
    else {
      if (finalSign === '-') {
        currentSum = currentSum - offset
        carry = 1
      } else {
        currentSum = currentSum + offset
        carry = -1
      }
    }
    const currentSumAsStrNoSign = currentSum < 0 ? currentSum.toString().substring(1) : currentSum.toString()
    result = `${currentSumAsStrNoSign}${result}`
  }
  if (carry !== 0) result = `${carry.toString()}${result}`
  return `${finalSign === '-' ? '-' : ''}${result}`
}

export const algorithmMapper: Record<string, Function> = {
  partialSums: _partialSums
}
