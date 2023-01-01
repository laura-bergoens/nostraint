const regexPositiveInteger = /^[0-9]*$/

export const sum = (a: string, b: string): string => {
  if (a.match(regexPositiveInteger)?.[0] !== a) return ''
  if (b.match(regexPositiveInteger)?.[0] !== b) return ''
  const intA = parseInt(a)
  const intB = parseInt(b)
  if (Number.isSafeInteger(intA) && Number.isSafeInteger(intB)) return (intA + intB).toString()
  return 'coucou'
}
