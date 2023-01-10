import { tracelogIndent, tracelogUnindent } from './tracelog'
import { cleanIntegerStr, isIntegerStr, splitSignAndNumber, stripLeadingZeroesOnCleanUnsigned } from './utils'

export const baseDivide = (nume: string, deno: string, algo: Function): string => {
  tracelogIndent('division.ts:baseDivide', `start - nume: ${nume}, deno: ${deno}`)
  if (!isIntegerStr(nume) || !isIntegerStr(deno)) {
    tracelogUnindent('division.ts:baseDivide', 'end - bad argument(s), result: ')
    return ''
  }
  const cleanNume = cleanIntegerStr(nume)
  const cleanDeno = cleanIntegerStr(deno)
  const intNume = parseInt(cleanNume)
  const intDeno = parseInt(cleanDeno)
  if (intNume === 0) {
    tracelogUnindent('division.ts:baseDivide', 'end - numerator is zero, result: 0')
    return '0'
  }
  if (intDeno === 0) {
    tracelogUnindent('division.ts:baseDivide', 'end - denominator is zero, result: ')
    return ''
  }
  if (_isDivisionSafe(intNume, intDeno)) {
    tracelogUnindent('division.ts:baseDivide', `end - using safe division, result: ${Math.floor(intNume / intDeno).toString()}`)
    return Math.floor(intNume / intDeno).toString()
  }
  const result: string = algo(cleanNume, cleanDeno)
  tracelogUnindent('division.ts:baseDivide', `end - using algo, result: ${result}`)
  return result
}

const _isDivisionSafe = (a: number, b: number): boolean => Number.isSafeInteger(a) && Number.isSafeInteger(b)

export const algorithmMapper: Record<string, Function> = {}

