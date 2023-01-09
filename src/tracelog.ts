import pino from 'pino'
const DEBUG = true
let indent = ''
const _logFunctions = ((): { _trace: Function, _traceAndIndent: Function, _unindentAndTrace: Function } => {
  const formatters = {
    level(): Object {
      return {}
    },
    bindings(): Object {
      return {}
    },
  }
  // https://github.com/pinojs/pino/blob/master/docs/api.md#logging-method-parameters
  const logger = pino({ level: 'trace', formatters, timestamp: false, messageKey: 'log' })
  const _trace = (caller: string, msg: string): void => logger.trace('%s%s: %s', indent, caller, msg)
  return {
    _trace,
    _traceAndIndent: (caller: string, msg: string): void => { _trace(caller, msg); indent = `${indent}  ` },
    _unindentAndTrace: (caller: string, msg: string): void => { indent = indent.substring(2); _trace(caller, msg) },
  }
})()
const _nullOp = (): void => {}
export const tracelog = DEBUG ? _logFunctions._trace : _nullOp
export const tracelogIndent = DEBUG ? _logFunctions._traceAndIndent : _nullOp
export const tracelogUnindent = DEBUG ? _logFunctions._unindentAndTrace : _nullOp
