export class Automaton {
  currentState
  states = []
  history = []
  error = false
  currentWord

  constructor (states) {
    this.states = states
  }

  start () {
    console.log('Start')
    this.currentState = this.getStateByName('s0')
    this.history = []
    this.error = false
    this.currentWord = ''
  }

  feed (inputChar) {
    if (this.error) {
      console.log('the automaton is on error state and currently not analizing new chars')
      return
    }

    const nextStateName = this.currentState.analize(inputChar)

    if (nextStateName === 'sE') {
      this.error = true
      this.currentState = 'sE'
      console.log('Read', inputChar)
    } else {
      const newBacktrace = `${this.currentState?.name} -> ${inputChar} -> ${nextStateName}`
      this.history.push(newBacktrace)
      this.currentWord += inputChar
      console.log(newBacktrace)
      this.currentState = this.getStateByName(nextStateName)
    }
  }

  getStateByName (stateName) {
    return this.states.find(state => state.name === stateName)
  }
}

export class State {
  name
  paths
  isAcceptance

  constructor (stateNumber, isAcceptance = false, paths = null) {
    this.name = `s${stateNumber}`
    this.paths = paths
    this.isAcceptance = isAcceptance
  }

  analize (inputChar) {
    const type = this.getTypeOfChar(inputChar)
    // console.log('type of char ', type)
    if (this.paths) {
      if (this.paths[type]) return this.paths[type]
      if (this.paths["'*'"]) return this.paths["'*'"]
    }
    return 'sE'
  }

  getTypeOfChar (char) {
    const ascci = char.charCodeAt(0)
    const isLetter = (ascci >= 65 && ascci <= 90) || (ascci >= 97 && ascci <= 122)
    if (isLetter) return 'α'
    const number = parseInt(char)
    if (number >= 0 && number <=9) return '^'
    return char
  }
}
