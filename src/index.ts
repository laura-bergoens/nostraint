import { baseAdd, baseSubtract, algorithmMapper } from './addition'
import { baseMultiply } from './multiplication'

export const add = (a: string, b: string): string => baseAdd(a, b, algorithmMapper.partialSums)

export const subtract = (a: string, b: string): string => baseSubtract(a, b, algorithmMapper.partialSums)

export const multiply = (a: string, b: string): string => baseMultiply(a, b)
