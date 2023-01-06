import { subtract } from '../src'
import { assert } from './test-helper'

describe('subtract', () => {
  context('invalid operands', () => {
    context('operand "a"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = subtract('12not an integer', '123')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = subtract('++12', '123')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = subtract('--12', '123')
          assert.equal(result, '', 'n°3')
        })
      })
    })
    context('operand "b"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = subtract('123', '12not an integer')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = subtract('123', '++12')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = subtract('123', '--12')
          assert.equal(result, '', 'n°3')
        })
      })
    })
  })

  context('valid operands', () => {
    context('safe integers', () => {
      context('positive integers', () => {
        it('should return the subtract of the two operands', () => {
          const result = subtract('57824', '352874')
          assert.equal(result, '-295050', 'n°1')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('+57 824', '+0 352 874')
          assert.equal(result, '-295050', 'n°2')
        })
      })
      context('positive/negative integers', () => {
        it('should return the subtract of the two operands', () => {
          const result = subtract('57824', '-352874')
          assert.equal(result, '410698', 'n°1')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('-57 824', '+0 352 874')
          assert.equal(result, '-410698', 'n°2')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('-057 824', '- 352 874')
          assert.equal(result, '295050', 'n°3')
        })
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      context('positive integers', () => {
        it('should return the subtract of the two operands', () => {
          const result = subtract('+003208719954145 87128325489171 3285264843995', '00009605718741261894786121 942972542409815990')
          assert.equal(result, '-6396998787116023502867051259257144971995', 'n°1')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('9007199254741000', '+9')
          assert.equal(result, '9007199254740991', 'n°2')
        })
      })
      context('positive/negative integers', () => {
        it('should return the subtract of the two operands', () => {
          const result = subtract('-003208719954145 87128325489171 3285264843995', '-00009605718741261894786121 942972542409815990')
          assert.equal(result, '6396998787116023502867051259257144971995', 'n°1')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('-003208719954145 87128325489171 3285264843995', '+000960571 8741261894786121 942972542409815990')
          assert.equal(result, '-12814438695407766069376834685827674659985', 'n°2')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('+003208719954145 87128325489171 3285264843995', '-000960571 8741261894786121 942972542409815990')
          assert.equal(result, '12814438695407766069376834685827674659985', 'n°3')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('-003208719954145 87128325489171 3285264843995', '- 0032087199 54145 871283254891713285264843995')
          assert.equal(result, '0', 'n°4')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('9007199254741000', '-9')
          assert.equal(result, '9007199254741009', 'n°5')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('- 9007199254741000', '-009')
          assert.equal(result, '-9007199254740991', 'n°6')
        })
        it('should return the subtract of the two operands', () => {
          const result = subtract('-9007199254741000', '9')
          assert.equal(result, '-9007199254741009', 'n°7')
        })
      })
      context.skip('debug', () => {
        it('should be true', () => {
          const result = subtract('170698', '180959')
          assert.equal(result, '-10261')
        })
      })
    })
  })
})
