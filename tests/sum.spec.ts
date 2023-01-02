import { assert } from 'chai'
import { sum } from '../src/sum'

describe('sum', () => {
  context('invalid operands', () => {
    context('operand "a"', () => {
      context('when operand is not a valid string formatted positive integer', () => {
        it('should return an empty string', () => {
          const result = sum('12not an integer', '123')
          assert.equal(result, '')
        })
      })
    })
    context('operand "b"', () => {
      context('when operand is not a valid string formatted positive integer', () => {
        it('should return an empty string', () => {
          const result = sum('123', '12not an integer')
          assert.equal(result, '')
        })
      })
    })
  })

  context('valid operands', () => {
    context('safe integers', () => {
      it('should return the sum of the two operands', () => {
        const result = sum('57824', '352874')
        assert.equal(result, '410698')
      })
    })
    context('unsafe integers / over Number.MAX_SAFE_INTEGER', () => {
      it('should return the sum of the two operands', () => {
        // Number.MAX_SAFE_INTEGER -> 9007199254740991
        const result = sum('0032087199264843995', '96057297254240990')
        assert.equal(result, '128144496519084985')
      })
    })
  })
})
