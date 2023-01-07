import { cleanIntegerStr, isIntegerStr, stripLeadingZeroesOnCleanUnsigned } from './utils'

const PARTIAL_PRODUCTS_DIGIT_COUNT_PER_PACKET = 7

export const baseMultiply = (a: string, b: string, algo: Function): string => {
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
  return algo(cleanA, cleanB)
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const baseMultiply_forRandomTestsOnly = (a: string, b: string, algo: Function): string => {
  const cleanA = cleanIntegerStr(a)
  const cleanB = cleanIntegerStr(b)
  return algo(cleanA, cleanB)
}

const _isMultiplicationSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b) && Number.isSafeInteger(a * b)

const _partialProducts = (a: string, b: string): string => {
  const packetsA = _toPackets(a)
  const packetsB = _toPackets(b)
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
  return stripLeadingZeroesOnCleanUnsigned(intermediateSumsStr.reverse().join(''))
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

