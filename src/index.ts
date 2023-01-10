import { baseAdd, baseSubtract, algorithmMapper as addAlgorithmMapper } from './addition'
import { baseMultiply, algorithmMapper as multiplyAlgorithmMapper } from './multiplication'
import { baseDivide, algorithmMapper as divideAlgorithmMapper } from './division'

export const add = (a: string, b: string): string => baseAdd(a, b, addAlgorithmMapper.partialSums)

export const subtract = (a: string, b: string): string => baseSubtract(a, b, addAlgorithmMapper.partialSums)

export const multiply = (a: string, b: string): string => baseMultiply(a, b, multiplyAlgorithmMapper.partialProducts)

export const divide = (a: string, b: string): string => baseDivide(a, b, divideAlgorithmMapper.something)
