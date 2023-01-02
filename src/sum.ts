import { reverse, stripLeadingZeros, charParseInt } from './utils'

const REGEX_POSITIVE_INTEGER = /^[0-9]*$/

export const sum = (a: string, b: string): string => {
  if (a.match(REGEX_POSITIVE_INTEGER)?.[0] !== a) return ''
  if (b.match(REGEX_POSITIVE_INTEGER)?.[0] !== b) return ''
  const intA = parseInt(a)
  const intB = parseInt(b)
  if (Number.isSafeInteger(intA) && Number.isSafeInteger(intB)) return (intA + intB).toString()
  const reverseA = reverse(stripLeadingZeros(a))
  const reverseB = reverse(stripLeadingZeros(b))
  const largest = reverseA.length > reverseB.length ? reverseA : reverseB
  const smallest = reverseA.length > reverseB.length ? reverseB : reverseA
  let carry = 0
  const result = []
  for (let i = 0; i < largest.length; ++i) {
    const currentSum = charParseInt(smallest[i]) + charParseInt(largest[i]) + carry
    carry = Math.floor(currentSum / 10)
    result.unshift((currentSum % 10).toString())
  }
  result.unshift(carry.toString())
  return stripLeadingZeros(result.join(''))
}
