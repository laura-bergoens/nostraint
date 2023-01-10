import { divide } from '../src'
import { assert } from './test-helper'

describe.only('divide', () => {
  context('invalid operands', () => {
    context('operand "a"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = divide('12not an integer', '123')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = divide('++12', '123')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = divide('--12', '123')
          assert.equal(result, '', 'n°3')
        })
      })
    })
    context('operand "b"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = divide('123', '12not an integer')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = divide('123', '++12')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = divide('123', '--12')
          assert.equal(result, '', 'n°3')
        })
      })
    })
  })

  context('valid operands', () => {
    context('safe integers', () => {
      context('zero', () => {
        it('should return 0 with numerator 0', () => {
          const result = divide('+ 000', '352874')
          assert.equal(result, '0', 'n°1')
        })
        it('should return an empty string with denominator 0', () => {
          const result = divide('57824', '- 00')
          assert.equal(result, '', 'n°1')
        })
      })
      context('positive integers', () => {
        it('should return the division of the two operands', () => {
          const result = divide('57824', '352874')
          assert.equal(result, '0', 'n°1')
        })
        it('should return the division of the two operands', () => {
          const result = divide('+57 824', '+0 352 874')
          assert.equal(result, '0', 'n°2')
        })
        it('should return the division of the two operands', () => {
          const result = divide('352874', '57824')
          assert.equal(result, '6', 'n°1')
        })
        it('should return the division of the two operands', () => {
          const result = divide('+0 352 874', '+57 824')
          assert.equal(result, '6', 'n°2')
        })
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      context.only('positive integers', () => {
        it('should return the division of the two operands', () => {
          const result = divide('+003208719954145 87128325489171 3285264843995', '00009605718741261894786121 942972542409815990')
          assert.equal(result, '30822061399000003459451476432006144905516489212991081971424302995549744006480050', 'n°1')
        })
        it('should return the division of the two operands', () => {
          const result = divide('9007199254741000', '2')
          assert.equal(result, '18014398509481982', 'n°2')
        })
      })
    })
  })
})
