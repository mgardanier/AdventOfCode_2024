const parseInput = () => {
    const fs = require('fs');
    try {
      const data = fs.readFileSync('/workspaces/AdventOfCode_2024/day-3/part1/input.txt', 'utf8');
      return data
    } catch (err) {
      console.error(err);
    }
}

const extractMultiplyOperations = (corruptedData) => {
    const regex = /mul\([0-9]*\s*,\s*[0-9]*\)/gm
    const stringOperations = corruptedData.match(regex)
    const terms = stringOperations.map((mul) => {
        const matchesRegex = /mul\(\s*([0-9]*)\s*,\s*([0-9]*)\s*\)/gm
        const matches = matchesRegex.exec(mul)
        return matches ? matches.slice(1).map((str) => parseInt(str)) : []
    })
    return terms
}

const run = () => {
    const input = parseInput()
    const ops = extractMultiplyOperations(input)
    const value = ops.reduce((prevVal, operands) => {
        return prevVal + (operands[0] * operands[1])
    }, 0)
    console.log(value)
}

run()