import { performance } from 'perf_hooks'
import { baseAdd, algorithmMapper } from '../../src/addition'

const EXECUTION_COUNT = 1000000
const SAFE_ARG_A = '+00456871'
const SAFE_ARG_B = '- 9851'
const UNSAFE_POS_ARG_A = '+0084 5398236339685583537 125951891419874 0132068978704156'
const UNSAFE_NEG_ARG_A = '- 0084 5398236339685583537 125951891419874 0132068978704156'
const UNSAFE_POS_ARG_B = '01089525498544 141443548925735425804120189789041260489'
const UNSAFE_NEG_ARG_B = '-01089525498544 141443548925735425804120189789041260489'

const bench = (): any => {
  console.log('START - ADD')
  console.log('\tSAFE INTEGERS')
  for (const [algorithm, fnc] of Object.entries(algorithmMapper)) {
    const startTime = performance.now()
    for (let i = 0; i < EXECUTION_COUNT; ++i)baseAdd(SAFE_ARG_A, SAFE_ARG_B, fnc)
    const endTime = performance.now()
    console.log(`\t\t${algorithm} on ${EXECUTION_COUNT} executions : ${endTime - startTime} milliseconds`)
  }
  console.log('\tSAFE INTEGERS - END')
  console.log('\tUNSAFE POSITIVE INTEGERS')
  for (const [algorithm, fnc] of Object.entries(algorithmMapper)) {
    const startTime = performance.now()
    for (let i = 0; i < EXECUTION_COUNT; ++i)baseAdd(UNSAFE_POS_ARG_A, UNSAFE_POS_ARG_B, fnc)
    const endTime = performance.now()
    console.log(`\t\t${algorithm} on ${EXECUTION_COUNT} executions : ${endTime - startTime} milliseconds`)
  }
  console.log('\tUNSAFE POSITIVE INTEGERS - END')
  console.log('\tUNSAFE NEGATIVE INTEGERS')
  for (const [algorithm, fnc] of Object.entries(algorithmMapper)) {
    const startTime = performance.now()
    for (let i = 0; i < EXECUTION_COUNT; ++i)baseAdd(UNSAFE_NEG_ARG_A, UNSAFE_NEG_ARG_B, fnc)
    const endTime = performance.now()
    console.log(`\t\t${algorithm} on ${EXECUTION_COUNT} executions : ${endTime - startTime} milliseconds`)
  }
  console.log('\tUNSAFE NEGATIVE INTEGERS - END')
  console.log('\tUNSAFE INTEGERS')
  for (const [algorithm, fnc] of Object.entries(algorithmMapper)) {
    const startTime = performance.now()
    for (let i = 0; i < EXECUTION_COUNT; ++i)baseAdd(UNSAFE_NEG_ARG_A, UNSAFE_POS_ARG_B, fnc)
    const endTime = performance.now()
    console.log(`\t\t${algorithm} on ${EXECUTION_COUNT} executions : ${endTime - startTime} milliseconds`)
  }
  console.log('\tUNSAFE INTEGERS - END')
  console.log('END - ADD')
}

bench()
