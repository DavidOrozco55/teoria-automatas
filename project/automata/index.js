import {
  Automaton,
  State
} from './states.mjs'
const results = {
  reservedKeywords: {
    name: 'Palabras reservadas',
    count: 0
  },
  identifiers: {
    name: 'Identificadores',
    count: 0
  },
  relationalOps: {
    name: 'Operaciones Relacionales',
    count: 0
  },
  arithmeticOps: {
    name: 'Operadores Aritméticos',
    count: 0
  },
  equalSign: {
    name: 'Asignaciones',
    count: 0
  },
  intNumbers: {
    name: 'Números enteros',
    count: 0
  },
  floatNumbers: {
    name: 'Números decimales',
    count: 0
  },
  comments: {
    name: 'comentarios',
    count: 0
  },
  parenthesis: {
    name: 'Paréntesis',
    count: 0
  },
  curlyBraces: {
    name: 'Llaves',
    count: 0
  },
  logicOperators: {
    name: 'Operadores lógicos',
    count: 0
  },
  errors: {
    name: 'Errores',
    count: 0
  }
}

const reservedKeywordTokens = ['if', 'else', 'switch', 'case', 'default', 'for', 'while', 'break', 'int', 'string', 'double', 'char']

const states = [
  new State(0, false, {
    '%': 's1',
    '*': 's2',
    '/': 's3',
    '-': 's7',
    '+': 's8',
    '^': 's9',
    α: 's12',
    '=': 's13',
    '&': 's15',
    '|': 's17',
    '!': 's19',
    '<': 's21',
    '>': 's23',
    '{': 's25',
    '}': 's25',
    '(': 's26',
    ')': 's26'
  }),
  new State(1, true),
  new State(2, true),
  new State(3, true, {
    '*': 's4'
  }),
  new State(4, false, {
    "'*'": 's4',
    '*': 's5'
  }),
  new State(5, false, {
    "'*'": 's4',
    '/': 's6'
  }),
  new State(6, true),
  new State(7, true, {
    '^': 's9',
    "'*'": 'sE'
  }),
  new State(8, true),
  new State(9, true, {
    '^': 's9',
    '.': 's10',
    "'*'": 'sE'
  }),
  new State(10, false, {
    '^': 's11',
    "'*'": 'sE'
  }),
  new State(11, true, {
    '^': 's11',
    "'*'": 'sE'
  }),
  new State(12, true, {
    α: 's12',
    _: 's12',
    '^': 's12',
    "'*'": 'sE'
  }),
  new State(13, true, {
    "'*'": 'sE',
    '=': 's14'
  }),
  new State(14, true),
  new State(15, false, {
    "'*'": 'sE',
    '&': 's16'
  }),
  new State(16, true),
  new State(17, false, {
    "'*'": 'sE',
    '|': 's18'
  }),
  new State(18, true),
  new State(19, true, {
    "'*'": 'sE',
    '=': 's20'
  }),
  new State(20, true),
  new State(21, true, {
    "'*'": 'sE',
    '=': 's22'
  }),
  new State(22, true),
  new State(23, true, {
    "'*'": 'sE',
    '=': 's24'
  }),
  new State(24, true),
  new State(25, true),
  new State(26, true)
]

const getTokenToAddUp = (stateName, word) => {
  if ([14, 20, 21, 22, 23, 24].map(v => 's' + v).includes(stateName)) return results.relationalOps
  if (stateName === 's12') {
    return reservedKeywordTokens.includes(word) ? results.reservedKeywords : results.identifiers
  }
  if ([16, 18, 19].map(v => 's' + v).includes(stateName)) return results.logicOperators
  if ([1, 2, 3, 7, 8].map(v => 's' + v).includes(stateName)) return results.arithmeticOps
  if (stateName === 's13') return results.equalSign
  if (stateName === 's9') return results.intNumbers
  if (stateName === 's11') return results.floatNumbers
  if (stateName === 's6') return results.comments
  if (stateName === 's25') return results.curlyBraces
  if (stateName === 's26') return results.parenthesis
}

const printResults = () => {
  document.getElementById('palabrasReservadas').innerText = `${results.reservedKeywords.name}: ${results.reservedKeywords.count}`
  document.getElementById('identificadores').innerText = `${results.identifiers.name}: ${results.identifiers.count}`
  document.getElementById('operadoresRelacionales').innerText = `${results.relationalOps.name}: ${results.relationalOps.count}`
  document.getElementById('operadoresLogicos').innerText = `${results.logicOperators.name}: ${results.logicOperators.count}`

  document.getElementById('operadoresAritmeticos').innerText = `${results.arithmeticOps.name}: ${results.arithmeticOps.count}`
  document.getElementById('asignaciones').innerText = `${results.equalSign.name}: ${results.equalSign.count}`
  document.getElementById('enteros').innerText = `${results.intNumbers.name}: ${results.intNumbers.count}`
  document.getElementById('decimales').innerText = `${results.floatNumbers.name}: ${results.floatNumbers.count}`

  document.getElementById('comentarios').innerText = `${results.comments.name}: ${results.comments.count}`
  document.getElementById('parentesis').innerText = `${results.parenthesis.name}: ${results.parenthesis.count}`
  document.getElementById('llaves').innerText = `${results.curlyBraces.name}: ${results.curlyBraces.count}`
  document.getElementById('errores').innerText = `${results.errors.name}: ${results.errors.count}`
}

const fileHolder = document.getElementById('fileHolder')
fileHolder.addEventListener('change', function () {
  const reader = new FileReader()
  const automaton = new Automaton(states)
  automaton.start()
  for (const tken in results) {
    results[tken].count = 0
  }

  reader.onload = function () {
    for (const char of this.result) {
      if ([' ', '\n', '\t'].includes(char)) {
        if (automaton.currentState.name !== 's0') {
          if (automaton.currentState.isAcceptance) {
            console.log("It's an acceptance state!")
            const token = getTokenToAddUp(automaton.currentState.name, automaton.currentWord)
            console.log(token.name)
            token.count = token.count + 1
          } else if (automaton.error) {
            console.log('Error state!')
            results.errors.count = results.errors.count + 1
          } else {
            console.log("It's a non acceptance state or an error state.")
            results.errors.count = results.errors.count + 1
          }

          console.log('\nrestarting automaton')
          automaton.start()
        }
      } else {
        automaton.feed(char)
      }
    }
    printResults()
  }

  reader.readAsText(this.files[0])
})
