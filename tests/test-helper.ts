import { assert } from 'chai'

const randomIntAsStringAndNumber = (): { numberVer: number, stringVer: string } => {
  const randomInteger = Math.floor(Math.random() * 1000000)
  const shouldBeNegative = Math.random() >= 0.5
  const finalInteger = shouldBeNegative ? -randomInteger : randomInteger
  return {
    numberVer: finalInteger,
    stringVer: finalInteger.toString()
  }
}

export { assert, randomIntAsStringAndNumber }
