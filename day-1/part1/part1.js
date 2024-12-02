const parseInput = () => {
    const fs = require('fs');
    try {
      const data = fs.readFileSync('/workspaces/AdventOfCode_2024/day-1/part1/input.txt', 'utf8');
      return data
    } catch (err) {
      console.error(err);
    }
}

const getLists = (inputText) => {
    const listsObject =  inputText.split('\n').reduce((prevVal, currentLine) => {
        const list1 = prevVal["list1"] ? prevVal["list1"] : []
        const list2 = prevVal["list2"] ? prevVal["list2"] : []
        const lineValues = currentLine.split(/\s+/)
        list1.push(lineValues[0])
        list2.push(lineValues[1])
        return { list1, list2}
    }, {})
    return listsObject
}

const diffLists = (list1, list2) => {
    const list1Sorted = list1.sort()
    const list2Sorted = list2.sort()
    let distance = 0

    list1Sorted.forEach((list1Value, index) => {
        distance += Math.abs(list1Value - list2Sorted[index])
    })
    return distance
}

const run = () => {
    const input = parseInput()
    // console.log(input)
    const {list1, list2} = getLists(input)
    console.log(diffLists(list1, list2))
}

run()