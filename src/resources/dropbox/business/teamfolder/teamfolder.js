function sum (arr) {
  return arr.reduce(function(a, b) { 
    return a + b
  }, 0)
}

const _sum = sum

export { _sum as sum }