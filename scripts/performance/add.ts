import { performance } from 'perf_hooks'
import { baseAdd, algorithmMapper } from '../../src/addition'

const EXECUTION_COUNT = 1000000
const ARG_A = '00951891410132068978704156'
const ARG_B = '010894804120189789041260489'

const bench = (): any => {
  console.log('START')
  for (const [algorithm, fnc] of Object.entries(algorithmMapper)) {
    const startTime = performance.now()
    for (let i = 0; i < EXECUTION_COUNT; ++i)baseAdd(ARG_A, ARG_B, fnc)
    const endTime = performance.now()
    console.log(`ADD : ${algorithm} on ${EXECUTION_COUNT} executions : ${endTime - startTime} milliseconds`)
  }
  console.log('END')
}

bench()
