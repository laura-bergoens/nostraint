import { baseAdd, algorithmMapper } from './addition'

export const add = (a: string, b: string): string => {
  return baseAdd(a, b, algorithmMapper.digitByDigitWithCarry)
}
