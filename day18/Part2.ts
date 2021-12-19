import {readFileSync} from 'fs'

const input = readFileSync('./input.txt', 'utf-8').toString().split('\n')

const magnitude = (data: string): number => {
    if (data.length == 1) {
        return Number(data)
    }

    let depth = 0
    let commaPosition = -1
    for (let i = 0; i < data.length - 1; i++) {
        switch (data[i]) {
            case '[' :
                depth++
                break
            case ']' :
                depth--
                break
            case ',' :
                if (depth == 1) commaPosition = i
                break
        }
    }

    const left = magnitude(data.slice(1, commaPosition))
    const right = magnitude(data.slice(commaPosition + 1, -1))
    return left * 3 + right * 2
}

const needToSplit = (data: string): boolean => {
    return data.replace(/\[/g, '').replace(/\]/g, '').split(',').filter(item => Number(item) > 9).length > 0
}

const split = (data: string): string => {
    //jdu po vsech znacich... najdu cislici, dalsi pozice je taky cislice? a pripadne dalsi a dalsi... cele cislo vzit, a nahradit []
    for (let i = 0; i < data.length; i++) {
        if (!['[', ',', ']'].includes(data[i]) && !['[', ',', ']'].includes(data[i + 1])) {
            const value = Number(data[i] + data[i + 1])
            const newItem = '[' + Math.floor(value / 2) + ',' + Math.ceil(value / 2) + ']'
            return data.slice(0, i).concat(newItem).concat(data.slice(i + 2))
        }
    }
    return data
}

const explode = (data: string): string => {
    let depth = 0
    let position = 0
    while (depth != 5 && position < data.length) {
        switch (data[position]) {
            case '[' :
                depth++
                break
            case ']' :
                depth--
                break
        }
        position++
    }
    if (depth != 5) {
        return data
    }


    let left = Number(data[position])
    let rightNumberPosition = position + 2
    let afterBlockPosition = position + 4
    if (!['[', ',', ']'].includes(data[position + 1])) {
        left = Number(data[position] + data[position + 1])
        rightNumberPosition++
        afterBlockPosition++
    }

    let right = Number(data[rightNumberPosition])
    if (!['[', ',', ']'].includes(data[rightNumberPosition + 1])) {
        right = Number(data[rightNumberPosition] + data[rightNumberPosition + 1])
        afterBlockPosition++
    }

    //propagate left
    let propagatePosition = position - 1
    let findedComma = false
    let substitutionDone = false
    while (!substitutionDone && propagatePosition > 0) {
        switch (data[propagatePosition]) {
            case ']' :
                propagatePosition--
                break
            case ',' :
                findedComma = true
                propagatePosition--
                break
            case '[' :
                propagatePosition--
                break
            default:
                if (findedComma) {
                    let newNumber = Number(data[propagatePosition]) + left
                    let numberOfPositions = 1
                    if (propagatePosition > 0 && !['[', ',', ']'].includes(data[propagatePosition - 1])) {
                        newNumber = Number(data[propagatePosition - 1] + data[propagatePosition]) + left
                        propagatePosition--
                        numberOfPositions++
                    }
                    data = data.slice(0, propagatePosition) + newNumber + data.slice(propagatePosition + numberOfPositions)
                    if (newNumber > 9 && numberOfPositions == 1) {
                        position++
                        afterBlockPosition++
                    }
                    substitutionDone = true
                }
        }
    }

    //propagate right
    propagatePosition = afterBlockPosition
    findedComma = false
    substitutionDone = false
    while (!substitutionDone && propagatePosition < data.length) {
        switch (data[propagatePosition]) {
            case ']' :
                propagatePosition++
                break
            case ',' :
                findedComma = true
                propagatePosition++
                break
            case '[' :
                propagatePosition++
                break
            default:
                if (findedComma) {
                    let newNumber = Number(data[propagatePosition]) + right
                    let numberOfPositions = 1
                    if (propagatePosition < data.length && !['[', ',', ']'].includes(data[propagatePosition + 1])) {
                        newNumber = Number(data[propagatePosition] + data[propagatePosition + 1]) + right
                        numberOfPositions++
                    }
                    data = data.slice(0, propagatePosition) + newNumber + data.slice(propagatePosition + numberOfPositions)
                    substitutionDone = true
                }

        }
    }

    return data.slice(0, position - 1).concat('0').concat(data.slice(afterBlockPosition))
}

const reduce = (data: string): string => {
    let prevIter = data
    let reducedData = explode(data)
    while (reducedData != prevIter) {
        prevIter = reducedData
        reducedData = explode(reducedData)
    }
    if (needToSplit(reducedData)) {
        const splittedData = split(reducedData)
        return reduce(splittedData)
    }

    return reducedData
}

const add = (a: string, b: string): string => {
    return reduce('[' + a + ',' + b + ']')
}

const magnitudes = new Array<number>()

for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
        if (i != j) {
            magnitudes.push(magnitude(add(input[i], input[j])))
        }
    }
}

console.log(Math.max(...magnitudes))



