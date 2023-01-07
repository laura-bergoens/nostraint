import { baseSubtract_forRandomTestsOnly, algorithmMapper } from '../../src/addition'
import { assert, randomSafeIntAsStringAndNumber } from '../test-helper'

const LOOP_COUNT = 100

describe('random baseSubtract', () => {
  it(`should return the expect subtraction result for random numbers ${LOOP_COUNT} times`, () => {
    for (const fnc of Object.values(algorithmMapper)) {
      for (let i = 0; i < LOOP_COUNT; ++i) {
        const { numberVer: numA, stringVer: argA } = randomSafeIntAsStringAndNumber()
        const { numberVer: numB, stringVer: argB } = randomSafeIntAsStringAndNumber()
        const result = baseSubtract_forRandomTestsOnly(argA, argB, fnc)
        assert.equal(result, (numA - numB).toString(), `"${argA} - ${argB}" should equal "${numA} - ${numB} = ${numA - numB} (str version :${(numA - numB).toString()}), got ${result}`)
      }
    }
    assert.equal(true, true)
  })
  context.skip('debug', () => {
    it('should be true', () => {
      for (const fnc of Object.values(algorithmMapper)) {
        const result = baseSubtract_forRandomTestsOnly('170698', '180959', fnc)
        assert.equal(result, '-10261')
      }
    })
  })
})
