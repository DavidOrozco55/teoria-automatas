const readline = require('readline')
const operations = require('./operations')

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const prompt = query => new Promise((resolve) => rl.question(query, resolve))

const getLanguages = async () => {
  const languages = []

  let element
  for (let index = 0; index < 2; index++) {
    const l = []
    console.log(`Lenguage ${index + 1}`)
    do {
      element = await prompt('Elemento (enter para cerrar): ')
      element.length && l.push(element)
    } while (element !== '')
    languages.push(l)
  }

  return languages
}

const getOption = () => {
  const operations = ['Intersección', 'Diferencia', 'Concatenación', 'Salir']
  const asciiChar = 97
  for (let index = 0; index < operations.length; index++) {
    console.log(`${String.fromCharCode(asciiChar + index)}) ${operations[index]}`)
  }

  return prompt('Respuesta: ')
}

(async () => {
  const languages = await getLanguages()
  try {
    do {
      const option = await getOption()

      if (option === 'd') break
      const op = operations[option]
      const isValidOption = typeof op === 'function'

      if (isValidOption) {
        console.log(op(languages))
      } else {
        console.log('Opción inválida')
      }
    } while (true)
  } catch (e) {
    console.errror('Error', e)
  } finally {
    rl.close()
  }
})()

rl.on('close', () => {
  console.log('Adiós ✌🏻')
  process.exit(0)
})
