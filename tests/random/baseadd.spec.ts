import { baseAdd_forRandomTestsOnly, algorithmMapper } from '../../src/addition'
import { assert, randomSafeIntAsStringAndNumber } from '../test-helper'

const LOOP_COUNT = 100

describe('random baseAdd', () => {
  it(`should return the expect subtraction result for random numbers ${LOOP_COUNT} times`, () => {
    for (const fnc of Object.values(algorithmMapper)) {
      for (let i = 0; i < LOOP_COUNT; ++i) {
        const { numberVer: numA, stringVer: argA } = randomSafeIntAsStringAndNumber()
        const { numberVer: numB, stringVer: argB } = randomSafeIntAsStringAndNumber()
        const result = baseAdd_forRandomTestsOnly(argA, argB, fnc)
        assert.equal(result, (numA + numB).toString(), `"${argA} + ${argB}" should equal "${numA} + ${numB} = ${numA + numB}, got ${result}. Failed on loop ${i}`)
      }
    }
    assert.equal(true, true)
  })
  context.skip('debug', () => {
    it('should be true', () => {
      for (const fnc of Object.values(algorithmMapper)) {
        const result = baseAdd_forRandomTestsOnly('136995', '-162834', fnc)
        assert.equal(result, '-25839')
      }
    })
  })
})
