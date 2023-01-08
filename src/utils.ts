import pino from 'pino' // REMOVE ME AT BUILD
const environment = process.env.NODE_ENV // REMOVE ME AT BUILD
let indent = ''
const _logFunctions = ((): { _trace: Function, _traceAndIndent: Function, _unindentAndTrace: Function } => { // REMOVE ME AT BUILD
  const formatters = { // REMOVE ME AT BUILD
    level(): Object { // REMOVE ME AT BUILD
      return {} // REMOVE ME AT BUILD
    }, // REMOVE ME AT BUILD
    bindings(): Object { // REMOVE ME AT BUILD
      return {}// REMOVE ME AT BUILD
    }, // REMOVE ME AT BUILD
  }// REMOVE ME AT BUILD
  // https://github.com/pinojs/pino/blob/master/docs/api.md#logging-method-parameters // REMOVE ME AT BUILD
  const logger = pino({ level: 'trace', formatters, timestamp: false, messageKey: 'log' })// REMOVE ME AT BUILD
  const _trace = (caller: string, msg: string): void => logger.trace('%s%s: %s', indent, caller, msg) // REMOVE ME AT BUILD
  return { // REMOVE ME AT BUILD
    _trace, // REMOVE ME AT BUILD
    _traceAndIndent: (caller: string, msg: string): void => { _trace(caller, msg); indent = `${indent}  ` }, // REMOVE ME AT BUILD
    _unindentAndTrace: (caller: string, msg: string): void => { indent = indent.substring(2); _trace(caller, msg) }, // REMOVE ME AT BUILD
  }// REMOVE ME AT BUILD
})()// REMOVE ME AT BUILD
const _emptyLog = (_a: string): void => {}// REMOVE ME AT BUILD
export const trace = environment === 'production' ? _emptyLog : _logFunctions._trace// REMOVE ME AT BUILD
export const traceIndent = environment === 'production' ? _emptyLog : _logFunctions._traceAndIndent// REMOVE ME AT BUILD
export const traceUnindent = environment === 'production' ? _emptyLog : _logFunctions._unindentAndTrace// REMOVE ME AT BUILD

const REGEX_INTEGER = /^\s*[+-]?\s*([0-9]*\s*)*$/

const stripLeadingZeroes = (a: string): string => {
  const clone = a
  let { sign, number } = ['+', '-'].includes(clone.charAt(0))
    ? { sign: clone.charAt(0), number: clone.substring(1) }
    : { sign: '', number: clone }
  while (number?.[0] === '0') number = number.substring(1)
  return `${sign}${number.length > 0 ? number : '0'}`
}
const stripSpaces = (a: string): string => a.replace(/\s/g, '')
export const stripLeadingZeroesOnCleanUnsigned = (a: string): string => {
  let clone = a
  while (clone?.[0] === '0') clone = clone.substring(1)
  return clone.length > 0 ? clone : '0'
}
export const isIntegerStr = (a: string): boolean => a.match(REGEX_INTEGER)?.[0] === a
export const cleanIntegerStr = (a: string): string => stripLeadingZeroes(stripSpaces(a))
export const splitSignAndNumber = (a: string): { number: string, sign: string } => ['+', '-'].includes(a.charAt(0)) ? { number: a.substring(1), sign: a.charAt(0) } : { number: a, sign: '+' }
export const isBiggerThan = (a: string, b: string): boolean => {
  if (a.length > b.length) return true
  if (a.length < b.length) return false
  if (a === b) return false
  let i = 0
  while (a[i] === b[i]) ++i
  return parseInt(a[i]) > parseInt(b[i])
}
export const changeSign = (a: string): string => a.charAt(0) === '-'
  ? a.replace('-', '')
  : (a.charAt(0) === '+' ? a.replace('+', '-') : `-${a}`)
