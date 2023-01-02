import { stripLeadingZeros, charParseInt } from './utils'

const REGEX_POSITIVE_INTEGER = /^[0-9]*$/

export const sum = (a: string, b: string): string => {
  if (a.match(REGEX_POSITIVE_INTEGER)?.[0] !== a) return ''
  if (b.match(REGEX_POSITIVE_INTEGER)?.[0] !== b) return ''
  const intA = parseInt(a)
  const intB = parseInt(b)
  if (Number.isSafeInteger(intA) && Number.isSafeInteger(intB)) return (intA + intB).toString()
  const strippedA = stripLeadingZeros(a)
  const strippedB = stripLeadingZeros(b)
  const largest = strippedA.length > strippedB.length ? strippedA : strippedB
  const smallest = strippedA.length > strippedB.length ? strippedB : strippedA
  let carry = 0
  let result = ''
  for (let i = largest.length - 1; i >= 0; --i) {
    const currentSum = charParseInt(smallest[i]) + charParseInt(largest[i]) + carry
    carry = Math.floor(currentSum / 10)
    result = `${(currentSum % 10).toString()}${result}`
  }
  result = `${carry.toString()}${result}`
  return stripLeadingZeros(result)
}
