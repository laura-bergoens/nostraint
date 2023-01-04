export const reverse = (a: string): string => {
  let reversed = ''
  for (let i = a.length - 1; i >= 0; --i) {
    reversed = `${reversed}${a[i]}`
  }
  return reversed
}

export const stripLeadingZeros = (a: string): string => {
  let stripped = a
  while (stripped?.[0] === '0') stripped = stripped.substring(1)
  return stripped
}

export const charParseInt = (a: string | undefined): number => {
  return a !== undefined ? parseInt(a) : 0
}

export const safeParseInt = (a: string | undefined): number => {
  return a !== undefined ? parseInt(a) : 0
}

export const safeRegexMatch = (a: string, b: RegExp): any[] => {
  const matches = a.match(b)
  return Array.isArray(matches) ? matches : []
}

export const REGEX_POSITIVE_INTEGER = /^[0-9]*$/
