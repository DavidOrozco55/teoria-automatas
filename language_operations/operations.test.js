const operations = require("./operations")

const languages = [ ['ca', 'ma'], ['nta', 'sa']]

describe('Teachers tests', () => {
  test('Intersection result', () => {
    const result = operations['a'](languages)
    const expectedResult = ['λ']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
  
  test('Intersection result', () => {
    const result = operations['a'](languages)
    const expectedResult = ['λ']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
  
  test('Difference result', () => {
    const result = operations['b'](languages)
    const expectedResult = ['ca', 'ma']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
  
  test('Concatenation result', () => {
    const result = operations['c'](languages)
    const expectedResult = ['canta', 'casa', 'manta', 'masa']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
})

describe('More tests', () => {
  test('Intersection result', () => {
    const result = operations['a']([ ['r', 's', 't', 'u', 'v', 'p', 'q', 'm'], ['n', 'o', 'j', 'i', 'g', 'k', 'p', 'q', 'm']])
    const expectedResult = ['p', 'q', 'm']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
  
  test('Difference result', () => {
    const result = operations['b']([ ['b', '1'], ['77', 'a'] ])
    const expectedResult = ['b', '1', '77', 'a']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })

  test('Difference when all are equal', () => {
    const result = operations['b']([ ['b'], ['b'] ])
    const expectedResult = ['λ']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
  
  test('Concatenation result', () => {
    const result = operations['c']([ ['1'], ['a'] ])
    const expectedResult = ['1a']
    expect(result).toEqual(expect.arrayContaining(expectedResult))
  })
})
