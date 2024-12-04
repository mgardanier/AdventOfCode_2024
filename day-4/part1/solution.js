
const parseInput = () => {
    const fs = require('fs');
    try {
      const data = fs.readFileSync('/workspaces/AdventOfCode_2024/day-4/part1/input.txt', 'utf8');
      return data
    } catch (err) {
      console.error(err);
    }
}

const createMatrix = (input) => {
    const matrix = input.split('\n').map(a => a.split(''))
    return matrix
}

const nextCharMap = {
    "X": "M",
    "M": "A", 
    "A": "S"
}

const directionMap = {
    "w": {
        "rowOffset": 0,
        "columnOffset": -1
    },
    "e": {
        "rowOffset": 0,
        "columnOffset": 1
    },
    "n": {
        "rowOffset": -1,
        "columnOffset": 0
    },
    "s": {
        "rowOffset": 1,
        "columnOffset": 0
    },
    "nw": {
        "rowOffset": -1,
        "columnOffset": -1
    },
    "ne": {
        "rowOffset": -1,
        "columnOffset": 1
    },
    "se": {
        "rowOffset": 1,
        "columnOffset": 1
    },
    "sw": {
        "rowOffset": 1,
        "columnOffset": -1
    }
}

const getRowAndColumnFromDirection = (currentRow, currentColumn, direction) => {
    const newRow = currentRow + directionMap[direction]["rowOffset"]
    const newColumn = currentColumn + directionMap[direction]["columnOffset"]
    return [ newRow, newColumn ]
}

const startDfsRowTotalForRow = (matrix, rowIndex) => {
    const row = matrix[rowIndex]
    let rowTotal = 0

    row.map((char, index, arr) => {
        if (char === "X") {
            // do DFS w
            let nextLocation = getRowAndColumnFromDirection(rowIndex, index, "w")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "w")
            // do DFS e
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "e")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "e")
            // do DFS n
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "n")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "n")
            // do DFS s
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "s")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "s")
            // do diagonal nw
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "nw")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "nw")
            // do diagonal ne
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "ne")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "ne")
            // do diagonal se
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "se")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "se")
            // do diagonal sw
            nextLocation = getRowAndColumnFromDirection(rowIndex, index, "sw")
            rowTotal += dfs(matrix, nextCharMap[char], nextLocation[0], nextLocation[1], "sw")
        }
    })
    return rowTotal
}


const dfs = (matrix, targetChar, row, column, direction) => {
    if (row < 0 || row >= matrix.length) {
        return 0
    }
    if (column < 0 || column >= matrix[row].length ) {
        return 0
    }
    if (matrix[row][column] === targetChar) {
        if (targetChar === "S") {
            return 1
        }
        const newTargetChar = nextCharMap[targetChar]
        const nextLocation = getRowAndColumnFromDirection(row, column, direction)

        return dfs(matrix, newTargetChar, nextLocation[0], nextLocation[1], direction)
    } else {
        return 0
    }
}

const run = () => {
    const input = parseInput()
    const matrix = createMatrix(input)
    const rowValues = matrix.map((row, rowIndex, array) => {
        return startDfsRowTotalForRow(matrix, rowIndex)
    })
    const sum = rowValues.reduce((sum, value) => sum += value)
    console.log(sum)
}

run()