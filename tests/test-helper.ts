import { assert } from 'chai'

const randomSafeIntAsStringAndNumber = (): { numberVer: number, stringVer: string } => {
  const randomInteger = Math.floor(Math.random() * 1000000)
  const shouldBeNegative = Math.random() >= 0.5
  const finalInteger = shouldBeNegative ? -randomInteger : randomInteger
  return {
    numberVer: finalInteger,
    stringVer: finalInteger.toString(),
  }
}

const randomSafePositiveIntAsStringAndNumber = (): { numberVer: number, stringVer: string } => {
  const randomInteger = Math.floor(Math.random() * 1000000)
  return {
    numberVer: randomInteger,
    stringVer: randomInteger.toString(),
  }
}

export { assert, randomSafeIntAsStringAndNumber, randomSafePositiveIntAsStringAndNumber }
