import { multiply } from '../src'
import { assert } from './test-helper'

describe('multiply', () => {
  context('invalid operands', () => {
    context('operand "a"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = multiply('12not an integer', '123')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = multiply('++12', '123')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = multiply('--12', '123')
          assert.equal(result, '', 'n°3')
        })
      })
    })
    context('operand "b"', () => {
      context('when operand is not a valid string formatted integer', () => {
        it('should return an empty string', () => {
          const result = multiply('123', '12not an integer')
          assert.equal(result, '', 'n°1')
        })
        it('should return an empty string', () => {
          const result = multiply('123', '++12')
          assert.equal(result, '', 'n°2')
        })
        it('should return an empty string', () => {
          const result = multiply('123', '--12')
          assert.equal(result, '', 'n°3')
        })
      })
    })
  })

  context('valid operands', () => {
    context('safe integers', () => {
      context('positive integers', () => {
        it('should return the product of the two operands', () => {
          const result = multiply('57824', '352874')
          assert.equal(result, '20404586176', 'n°1')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('+57 824', '+0 352 874')
          assert.equal(result, '20404586176', 'n°2')
        })
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      context('positive integers', () => {
        it('should return the product of the two operands', () => {
          const result = multiply('+003208719954145 87128325489171 3285264843995', '00009605718741261894786121 942972542409815990')
          assert.equal(result, 'todo', 'n°1')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('9007199254740991', '2')
          assert.equal(result, 'todo', 'n°2')
        })
      })
      context.skip('debug', () => {
        it('should be true', () => {
          const result = multiply('136995', '162834')
          assert.equal(result, '22307443830')
        })
      })
    })
  })
})
