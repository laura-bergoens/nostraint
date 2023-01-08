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
      context('positive/negative integers', () => {
        it('should return the product of the two operands', () => {
          const result = multiply('57824', '-352874')
          assert.equal(result, '-20404586176', 'n°1')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('-57 824', '+0 352 874')
          assert.equal(result, '-20404586176', 'n°2')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('-057 824', '- 352 874')
          assert.equal(result, '20404586176', 'n°3')
        })
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      context('positive integers', () => {
        it('should return the product of the two operands', () => {
          const result = multiply('+003208719954145 87128325489171 3285264843995', '00009605718741261894786121 942972542409815990')
          assert.equal(result, '30822061399000003459451476432006144905516489212991081971424302995549744006480050', 'n°1')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('9007199254740991', '2')
          assert.equal(result, '18014398509481982', 'n°2')
        })
      })
      context('positive/negative integers', () => {
        it('should return the product of the two operands', () => {
          const result = multiply('-003208719954145 87128325489171 3285264843995', '-00009605718741261894786121 942972542409815990')
          assert.equal(result, '30822061399000003459451476432006144905516489212991081971424302995549744006480050', 'n°1')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('-003208719954145 87128325489171 3285264843995', '+000960571 8741261894786121 942972542409815990')
          assert.equal(result, '-30822061399000003459451476432006144905516489212991081971424302995549744006480050', 'n°2')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('+003208719954145 87128325489171 3285264843995', '-000960571 8741261894786121 942972542409815990')
          assert.equal(result, '-30822061399000003459451476432006144905516489212991081971424302995549744006480050', 'n°3')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('-003208719954145 87128325489171 3285264843995', '+ 0000000')
          assert.equal(result, '0', 'n°4')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('9007199254741000', '-9')
          assert.equal(result, '-81064793292669000', 'n°5')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('- 9007199254741000', '-009')
          assert.equal(result, '81064793292669000', 'n°6')
        })
        it('should return the product of the two operands', () => {
          const result = multiply('-9007199254741000', '9')
          assert.equal(result, '-81064793292669000', 'n°7')
        })
      })
    })
  })
})
