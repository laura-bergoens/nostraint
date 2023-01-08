import {
  cleanIntegerStr,
  isIntegerStr,
  splitSignAndNumber,
  isBiggerThan,
  changeSign,
  stripLeadingZeroesOnCleanUnsigned, traceIndent, traceUnindent,
} from './utils'
// Reminder:  Number.MAX_SAFE_INTEGER -> 9007199254740991
const PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET = 15

export const baseAdd = (a: string, b: string, algo: Function): string => {
  traceIndent('addition.ts:baseAdd', `start - a: ${a}, b: ${b}`)
  if (!isIntegerStr(a) || !isIntegerStr(b)) {
    traceUnindent('addition.ts:baseAdd', 'end - bad argument(s), result: ')
    return ''
  }
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (_isAdditionSafe(intA, intB)) {
    traceUnindent('addition.ts:baseAdd', `end - using safe addition, result: ${(intA + intB).toString()}`)
    return (intA + intB).toString()
  }
  const result: string = algo(cleanA, cleanB)
  traceUnindent('addition.ts:baseAdd', `end - using algo, result: ${result}`)
  return result
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseAdd_forRandomTestsOnly = (a: string, b: string, algo: Function): string => {
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  return algo(cleanA, cleanB)
}

export const baseSubtract = (a: string, b: string, algo: Function): string => {
  traceIndent('addition.ts:baseSubtract', `start - a: ${a}, b: ${b}`)
  if (!isIntegerStr(a) || !isIntegerStr(b)) {
    traceUnindent('addition.ts:baseSubtract', 'end - bad argument(s), result: ')
    return ''
  }
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (_isSubtractionSafe(intA, intB)) {
    traceUnindent('addition.ts:baseSubtract', `end - using safe subtraction, result: ${(intA - intB).toString()}`)
    return (intA - intB).toString()
  }
  const result: string = algo(cleanA, changeSign(cleanB))
  traceUnindent('addition.ts:baseSubtract', `end - using algo, result: ${result}`)
  return result
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseSubtract_forRandomTestsOnly = (a: string, b: string, algo: Function): string => {
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  return algo(cleanA, changeSign(cleanB))
}

const _isAdditionSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a + b)

const _isSubtractionSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a - b)

const _partialSums = (a: string, b: string): string => {
  const { number: numberA, sign: signA } = splitSignAndNumber(a)
  const { number: numberB, sign: signB } = splitSignAndNumber(b)
  if (signA === '+' && signB === '+') return _partialSumsAllPositive(numberA, numberB)
  if (signA === '-' && signB === '-') return _partialSumsAllNegative(numberA, numberB)
  if (signA === '-') return _partialSumsMixed(numberA, numberB)
  return _partialSumsMixed(numberB, numberA)
}

const _partialSumsAllPositive = (a: string, b: string): string => {
  traceIndent('addition.ts:_partialSumsAllPositive', `start - a: ${a}, b: ${b}`)
  const packetsA = _toPackets(a)
  const packetsB = _toPackets(b)
  let result = ''
  let carry = 0
  while (packetsA.length > 0) {
    let numberA = packetsA.shift()
    let numberB = packetsB.shift()
    numberA = numberA === undefined ? '0' : numberA
    numberB = numberB === undefined ? '0' : numberB
    const currentSum = parseInt(numberA) + parseInt(numberB) + carry
    let currentSumAsStr = currentSum.toString()
    if (currentSumAsStr.length > PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET) {
      carry = parseInt(currentSumAsStr.charAt(0))
      currentSumAsStr = currentSumAsStr.substring(1)
    } else carry = 0
    result = `${currentSumAsStr.padStart(PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET, '0')}${result}`
  }
  if (carry !== 0) result = `${carry.toString()}${result}`
  result = stripLeadingZeroesOnCleanUnsigned(result)
  traceUnindent('addition.ts:_partialSumsAllPositive', `end - result: ${result}`)
  return result
}

const _partialSumsAllNegative = (a: string, b: string): string => {
  traceIndent('addition.ts:_partialSumsAllNegative', `start - a: ${a}, b: ${b}`)
  const result = `-${_partialSumsAllPositive(a, b)}`
  traceUnindent('addition.ts:_partialSumsAllNegative', `end - result: ${result}`)
  return result
}

const _partialSumsMixed = (neg: string, pos: string): string => {
  traceIndent('addition.ts:_partialSumsMixed', `start - neg: ${neg}, pos: ${pos}`)
  if (neg === pos) {
    traceUnindent('addition.ts:_partialSumsMixed', 'end - compensating, result: 0')
    return '0'
  }
  const finalSign = isBiggerThan(neg, pos) ? '-' : '+'
  const packetsNeg = _toPackets(neg)
  const packetsPos = _toPackets(pos)
  let result = ''
  let carry = 0
  while (packetsNeg.length > 0 || packetsPos.length > 0) {
    let negative = packetsNeg.shift()
    let positive = packetsPos.shift()
    negative = negative === undefined ? '0' : negative
    positive = positive === undefined ? '0' : positive
    const offset = parseInt('1'.padStart(PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET, '0'))
    let currentSum = parseInt(positive) - parseInt(negative) + carry
    if ((finalSign === '-' && currentSum <= 0) || (finalSign === '+' && currentSum >= 0)) {
      carry = 0
    } else {
      if (finalSign === '-') {
        currentSum = currentSum - offset
        carry = 1
      } else {
        currentSum = currentSum + offset
        carry = -1
      }
    }
    const currentSumAsStrNoSign = currentSum < 0 ? currentSum.toString().substring(1) : currentSum.toString()
    result = `${currentSumAsStrNoSign.padStart(PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET, '0')}${result}`
  }
  if (carry !== 0) result = `${carry.toString()}${result}`
  result = `${finalSign === '-' ? '-' : ''}${stripLeadingZeroesOnCleanUnsigned(result)}`
  traceUnindent('addition.ts:_partialSumsMixed', `end - result: ${result}`)
  return result
}

const _toPackets = (a: string): string[] => {
  const packets = []
  let start = Math.max(a.length - PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET, 0)
  let end = a.length
  let substr = a.substring(start, end)
  while (substr.length > 0) {
    packets.push(substr)
    end = start
    start = Math.max(start - PARTIAL_SUMS_DIGIT_COUNT_PER_PACKET, 0)
    substr = a.slice(start, end)
  }
  return packets
}

export const algorithmMapper: Record<string, Function> = {
  partialSums: _partialSums,
}
