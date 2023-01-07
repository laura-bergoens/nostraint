import { baseMultiply_forRandomTestsOnly, algorithmMapper } from '../../src/multiplication'
import { assert, randomSafePositiveIntAsStringAndNumber } from '../test-helper'

const LOOP_COUNT = 100

describe('random baseMultiply', () => {
  it(`should return the expect subtraction result for random numbers ${LOOP_COUNT} times`, () => {
    for (const fnc of Object.values(algorithmMapper)) {
      for (let i = 0; i < LOOP_COUNT; ++i) {
        const { numberVer: numA, stringVer: argA } = randomSafePositiveIntAsStringAndNumber()
        const { numberVer: numB, stringVer: argB } = randomSafePositiveIntAsStringAndNumber()
        const result = baseMultiply_forRandomTestsOnly(argA, argB, fnc)
        assert.equal(result, (numA * numB).toString(), `"${argA} * ${argB}" should equal "${numA} * ${numB} = ${numA * numB}, got ${result}. Failed on loop ${i}`)
      }
    }
    assert.equal(true, true)
  })
  context.skip('debug', () => {
    it('should be true', () => {
      for (const fnc of Object.values(algorithmMapper)) {
        const result = baseMultiply_forRandomTestsOnly('162203', '10536', fnc)
        assert.equal(result, '1708970808')
      }
    })
  })
})
