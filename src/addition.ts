import {
  safeRegexMatch,
  cleanIntegerStr,
  isIntegerStr,
  splitSignAndNumber,
  isBiggerThan,
  changeSign
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

export const baseSubtract = (a: string, b: string, algo: Function): string => {
  if (!isIntegerStr(a) || !isIntegerStr(b)) return ''
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (_isSubtractionSafe(intA, intB)) return (intA - intB).toString()
  return algo(cleanA, changeSign(cleanB))
}

const _isAdditionSafe = (a: number, b: number): boolean => {
  return Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a + b)
}

const _isSubtractionSafe = (a: number, b: number): boolean => {
  return Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a - b)
}

const _partialSums = (a: string, b: string): string => {
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
  let result = ''
  let carry = 0
  while (packetsA.length > 0 || packetsB.length > 0) {
    let numberA = packetsA.pop()
    let numberB = packetsB.pop()
    numberA = numberA === undefined ? '0' : numberA
    numberB = numberB === undefined ? '0' : numberB
    const maxDigitBeforeCarry = Math.max(numberA.length, numberB.length)
    const currentSum = parseInt(numberA) + parseInt(numberB) + carry
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
