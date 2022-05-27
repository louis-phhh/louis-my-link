import nanoid from 'nanoid'
import nanoidDictionary from 'nanoid-dictionary'

type EnumAlphabet = 
  'alphanumeric' |
  'lowercase' |
  'nolookalikes' |
  'nolookalikesSafe' |
  'numbers' |
  'uppercase'

type TypeGenFunctionMapping = {
  [key: string]: (size?: number | undefined) => string
}

const functions: TypeGenFunctionMapping = {}

export function getGenFunction (alphabet: EnumAlphabet = 'numbers', size = 10) {
  const functionKey = alphabet + size
  let gen = functions[functionKey]
  if (!gen) {
    gen = nanoid.customAlphabet(nanoidDictionary[alphabet], size)
    functions[functionKey] = gen
  }

  return gen
}

export function generate (alphabet: EnumAlphabet = 'numbers', size = 10) {
  const gen = getGenFunction(alphabet, size)
  return gen(size)
}

export function genRandomIdForMongoDocument () {
  return +generate()
}
