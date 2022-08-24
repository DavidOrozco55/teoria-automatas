const intersection = lngs => {
  const [lng1 = [], lng2 = []] = lngs
  const commonElements = lng1.filter(el => lng2.includes(el))
  return commonElements.length ? commonElements : ['λ']
}

const difference = lngs => {
  const commonElements = intersection(lngs)
  const flatted = lngs.flat()
  if (commonElements[0] === 'λ') return flatted
  const elements = flatted.filter(el => !commonElements.includes(el))
  return elements.length === 0 ? ['λ'] : elements
}

const concat = lngs => {
  const [lng1 = [], lng2 = []] = lngs
  return lng1.map(el => lng2.map(el2 => el + el2)).flat()
}

module.exports = {
  a: intersection,
  b: difference,
  c: concat
}
