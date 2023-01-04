import { assert } from 'chai'
import { add } from '../src'

describe('add', () => {
  context('invalid operands', () => {
    context('operand "a"', () => {
      context('when operand is not a valid string formatted positive integer', () => {
        it('should return an empty string', () => {
          const result = add('12not an integer', '123')
          assert.equal(result, '')
        })
      })
    })
    context('operand "b"', () => {
      context('when operand is not a valid string formatted positive integer', () => {
        it('should return an empty string', () => {
          const result = add('123', '12not an integer')
          assert.equal(result, '')
        })
      })
    })
  })

  context('valid operands', () => {
    context('safe integers', () => {
      it('should return the sum of the two operands', () => {
        const result = add('57824', '352874')
        assert.equal(result, '410698')
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      it('should return the sum of the two operands', () => {
        // Number.MAX_SAFE_INTEGER -> 9007199254740991
        const result = add('003208719954145871283254891713285264843995', '00009605718741261894786121942972542409815990')
        assert.equal(result, '12814438695407766069376834685827674659985')
      })
    })
  })
})
