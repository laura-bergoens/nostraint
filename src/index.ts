import { baseAdd, baseSubtract, algorithmMapper } from './addition'

export const add = (a: string, b: string): string => {
  return baseAdd(a, b, algorithmMapper.partialSums)
}

export const subtract = (a: string, b: string): string => {
  return baseSubtract(a, b, algorithmMapper.partialSums)
}
