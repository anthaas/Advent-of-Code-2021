let p1Position = 8
let p2Position = 4
let p1Score = 0
let p2Score = 0

let run = 1
let turnPlayer1 = true
while (true) {
    if (p1Score >= 1000 || p2Score >= 1000) break
    const steps = 3 * run + 3
    run += 3
    if (turnPlayer1) {
        p1Position = (p1Position + steps) % 10 == 0 ? 10 : (p1Position + steps) % 10
        p1Score += p1Position
        turnPlayer1 = false
    } else {
        p2Position = (p2Position + steps) % 10 == 0 ? 10 : (p2Position + steps) % 10
        p2Score += p2Position
        turnPlayer1 = true
    }
}
run--
const looser = p1Score >= 1000 ? p2Score : p1Score
console.log(looser)
console.log(run)
console.log(looser * run)