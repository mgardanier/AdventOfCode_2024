const parseInput = () => {
  const fs = require('fs');
  try {
    const data = fs.readFileSync('/workspaces/AdventOfCode_2024/day-3/part2/input.txt', 'utf8');
    return data
  } catch (err) {
    console.error(err);
  }
}

const extractOperations = (corruptedData) => {
  const regex = /(mul\(\s*[0-9]*\s*,\s*[0-9]*\s*\))|do\(\)|don't\(\)/gm
  const stringOperations = corruptedData.match(regex)
  return stringOperations
}

const parseMultiplyOperations = (operations) => {
  let enabled = true
  const enabledOps = []
  for (op of operations) {
    if (op.includes("don't")) {
      enabled = false
    } else if (op.includes("do")) {
      enabled = true
    } else {
      if (enabled) enabledOps.push(op)
    }
  }
  return enabledOps
}

const getMultiplicationResult = (stringOperations) => {
  const terms = stringOperations.map((mul) => {
    const matchesRegex = /mul\(\s*([0-9]*)\s*,\s*([0-9]*)\s*\)/gm
    const matches = matchesRegex.exec(mul)
    return matches ? matches.slice(1).map((str) => parseInt(str)) : []
  })
  const value = terms.reduce((prevVal, operands) => {
        return prevVal + (operands[0] * operands[1])
    }, 0)
  return value
}

const run = () => {
  const input = parseInput()
  const ops = extractOperations(input)
  const enabledOps = parseMultiplyOperations(ops)
  // const multiplies = parseMultiplyOperations(ops)
  // const value = ops.reduce((prevVal, operands) => {
  //     return prevVal + (operands[0] * operands[1])
  // }, 0)
  const value = getMultiplicationResult(enabledOps)
  console.log(value)
}

run()