import { assert } from 'chai'
import { sum } from '../src/index'

describe('Index tests', () => {
  it('should return 5 when 2 is added to 3', () => {
    const result = sum(2, 3)
    assert.equal(result, 5)
  })
})
