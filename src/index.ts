import { baseAdd, baseSubtract, algorithmMapper } from './addition'

export const add = (a: string, b: string): string => baseAdd(a, b, algorithmMapper.partialSums)

export const subtract = (a: string, b: string): string => baseSubtract(a, b, algorithmMapper.partialSums)
