import { tracelogIndent, tracelogUnindent } from './tracelog'
import { cleanIntegerStr, isIntegerStr, splitSignAndNumber, stripLeadingZeroesOnCleanUnsigned } from './utils'

const PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET = 7

export const baseMultiply = (a: string, b: string, algo: Function): string => {
  tracelogIndent('multiplication.ts:baseMultiply', `start - a: ${a}, b: ${b}`)
  if (!isIntegerStr(a) || !isIntegerStr(b)) {
    tracelogUnindent('multiplication.ts:baseMultiply', 'end - bad argument(s), result: ')
    return ''
  }
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  const intA = parseInt(cleanA)
  const intB = parseInt(cleanB)
  if (intA === 0 || intB === 0) {
    tracelogUnindent('multiplication.ts:baseMultiply', 'end - multiplied by zero, result: 0')
    return '0'
  }
  if (_isMultiplicationSafe(intA, intB)) {
    tracelogUnindent('multiplication.ts:baseMultiply', `end - using safe multiplication, result: ${(intA * intB).toString()}`)
    return (intA * intB).toString()
  }
  const result: string = algo(cleanA, cleanB)
  tracelogUnindent('multiplication.ts:baseMultiply', `end - using algo, result: ${result}`)
  return result
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseMultiply_forRandomTestsOnly = (a: string, b: string, algo: Function): string => {
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  return algo(cleanA, cleanB)
}

const _isMultiplicationSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a * b)

const _partialProducts = (a: string, b: string): string => {
  tracelogIndent('multiplication.ts:_partialProducts', `start - a: ${a}, b: ${b}`)
  const { number: numberA, sign: signA } = splitSignAndNumber(a)
  const { number: numberB, sign: signB } = splitSignAndNumber(b)
  const isNegative = signA !== signB
  const packetsA = _toPackets(numberA)
  const packetsB = _toPackets(numberB)
  const longest = packetsA.length > packetsB.length ? packetsA : packetsB
  const smallest = packetsA.length > packetsB.length ? packetsB : packetsA
  const intermediateSumsStr = Array<string>((longest.length * 2) + 1).fill('0')
  for (let i = 0; i < longest.length; ++i) {
    let numberA = longest[i]
    numberA = numberA === undefined ? '0' : numberA
    for (let j = 0; j < smallest.length; ++j) {
      let numberB = smallest[j]
      numberB = numberB === undefined ? '0' : numberB
      const currentSum = parseInt(numberA) * parseInt(numberB)
      let currentIntermediateSum = parseInt(intermediateSumsStr[i + j])
      currentIntermediateSum = currentIntermediateSum + currentSum
      const currentIntermediateSumStr = currentIntermediateSum.toString().padStart(PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, '0')
      if (currentIntermediateSumStr.length > PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET) {
        let currentIndex = i + j + 1
        let substr = currentIntermediateSumStr.substring(currentIntermediateSumStr.length - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, currentIntermediateSumStr.length)
        intermediateSumsStr[i + j] = substr
        let carryStr = currentIntermediateSumStr.substring(0, currentIntermediateSumStr.length - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET)
        while (carryStr.length > 0) {
          let inter = parseInt(intermediateSumsStr[currentIndex])
          inter = inter + parseInt(carryStr)
          const interStr = inter.toString().padStart(PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, '0')
          substr = interStr.substring(interStr.length - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, interStr.length)
          intermediateSumsStr[currentIndex] = substr
          carryStr = interStr.substring(0, interStr.length - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET)
          currentIndex = currentIndex + 1
        }
      } else {
        intermediateSumsStr[i + j] = currentIntermediateSumStr
      }
    }
  }
  const result = `${isNegative ? '-' : ''}${stripLeadingZeroesOnCleanUnsigned(intermediateSumsStr.reverse().join(''))}`
  tracelogUnindent('multiplication.ts:_partialProducts', `end - result: ${result}`)
  return result
}

const _toPackets = (a: string): string[] => {
  const packets: string[] = []
  let start = Math.max(a.length - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, 0)
  let end = a.length
  let substr = a.substring(start, end)
  while (substr.length > 0) {
    packets.push(substr)
    end = start
    start = Math.max(start - PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET, 0)
    substr = a.slice(start, end)
  }
  return packets
}

export const algorithmMapper: Record<string, Function> = {
  partialProducts: _partialProducts,
}

