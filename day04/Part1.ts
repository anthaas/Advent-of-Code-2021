import {readFileSync} from 'fs';

function isBingo(board: Array<Array<number>>): boolean {
    const anyRowBingo = board.map(row => row.filter(item => item != -1).length == 0).some(Boolean)
    const transposed = board[0].map((_, colIndex) => board.map(row => row[colIndex]))
    const anyColBingo = transposed.map(row => row.filter(item => item != -1).length == 0).some(Boolean)
    return anyRowBingo || anyColBingo
}


function findWinnerBoard(boards: Array<Array<Array<number>>>): Array<Array<number>> {
    for (let i = 0; i < boards.length; i++) {
        if (isBingo(boards[i])) {
            return boards[i]
        }
    }

    return []
}


const input = readFileSync('./input.txt', 'utf-8').trim().split("\n\n")
const draws = input[0].split(",").map(Number)
let boards: Array<Array<Array<number>>> = input.slice(1).map(item => item.split("\n").map(row => row.split(' ').filter(ch => ch != "").map(Number)))


let winnerBoard: Array<Array<number>> = []
let winnerNumber = -1
for (const element of draws) {
    //play one turn
    boards = boards.map(board => board.map(rows => rows.map(item => item == element ? -1 : item)))
    const bingoBoard = findWinnerBoard(boards)
    if (bingoBoard.length != 0) {
        winnerNumber = element
        winnerBoard = bingoBoard
        break;
    }
}

const sumWinnerBoard = winnerBoard.map(item => item.filter(item => item != -1)
    .reduce((sum, current) => sum + current, 0))
    .reduce((sum, current) => sum + current, 0)
console.log(sumWinnerBoard * winnerNumber)
