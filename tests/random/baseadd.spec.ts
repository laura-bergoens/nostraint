import { baseAdd_forRandomTestsOnly, algorithmMapper } from '../../src/addition'
import { assert, randomIntAsStringAndNumber } from '../test-helper'

const LOOP_COUNT = 100

describe('random baseAdd', () => {
  it(`should return the expect subtraction result for random numbers ${LOOP_COUNT} times`, () => {
    for (const fnc of Object.values(algorithmMapper)) {
      for (let i = 0; i < LOOP_COUNT; ++i) {
        const { numberVer: numA, stringVer: argA } = randomIntAsStringAndNumber()
        const { numberVer: numB, stringVer: argB } = randomIntAsStringAndNumber()
        const result = baseAdd_forRandomTestsOnly(argA, argB, fnc)
        assert.equal(result, (numA + numB).toString(), `"${argA} + ${argB}" should equal "${numA} + ${numB} = ${numA + numB}, got ${result}. Failed on loop ${i}`)
      }
    }
    assert.equal(true, true)
  })
})
