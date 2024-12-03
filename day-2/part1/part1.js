const parseInput = () => {
    const fs = require('fs');
    try {
      const data = fs.readFileSync('/workspaces/AdventOfCode_2024/day-2/part1/input.txt', 'utf8');
      return data
    } catch (err) {
      console.error(err);
    }
}

const getReports = (input) => {
    return input.split('\n').map(report => report.split(/\s+/).map(level => parseInt(level)))
}

const isProperOrderIterative= (reportArr) => {
    if(!isProperOrder(reportArr)) {
        throw new Error(`wrong order`)
    }
}

const isProperOrder = (reportArr) => {
    const sortedReport = [...reportArr]
    const originalArray = [...reportArr]
    sortedReport.sort((a, b) => a - b)
    if(sortedReport.join('') !== originalArray.join('') && sortedReport.join('') !== originalArray.reverse().join('')) {
        return false
    }
    return true
}

const isSmallEnoughStepsIterative = (reportArr) => {
    if(!isSmallEnoughSteps(reportArr)) {
        throw new Error(`too big`)
    }
}

const isSmallEnoughSteps = (reportArr) => {
    let infractionCount = 0
    reportArr.forEach((value, index) => {
        if(index != 0 && index < reportArr.length) {
            const step = Math.abs(value - reportArr[index - 1])
            if(step > 3 || step === 0) infractionCount += 1
        }
    })
    if (infractionCount > 0) return false
    return true
}
const getSafeReportsCount = (reports) => {
    return reports.reduce((prevVal, report) => {
        try {
            // console.log(report)
            isSmallEnoughStepsIterative(report)
            isProperOrderIterative(report)
            console.log(`proper report ${report}`)
            return prevVal + 1
        } catch(e) { 
            const results = report.map((element, index, arr) => {
                const subArray = [...arr.slice(0, index), ...arr.slice(index + 1)]
                return isSmallEnoughSteps(subArray) && isProperOrder(subArray)
            })
            debugger
            // console.log(e)
            // console.log(`invalid report ${report}`)
            if(results.filter(a => a === true).length === 0) return prevVal
            return prevVal + 1
        }
    }, 0)
}

const run = () => {
    const input = parseInput()
    const reports = getReports(input)
    console.log(getSafeReportsCount(reports))
}

run()