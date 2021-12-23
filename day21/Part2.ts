const combinations = new Map<number, number>([[3, 1], [4, 3], [5, 6], [6, 7], [7, 6], [8, 3], [9, 1]]);

const recur = (p1: number, s1: number, p2: number, s2: number, turn1: boolean): number => {
    if (s1 >= 21) {
        return 1
    } else if (s2 >= 21) {
        return 0
    }

    let sum = 0
    const currPos = turn1 ? p1 : p2
    const currScore = turn1 ? s1 : s2
    for (let i = 3; i <= 9; i++) {
        const newPos = (currPos + i) % 10 == 0 ? 10 : (currPos + i) % 10
        const newScore = currScore + newPos
        sum += combinations.get(i)! * (turn1 ? recur(newPos, newScore, p2, s2, !turn1) : recur(p1, s1, newPos, newScore, !turn1))
    }
    return sum;
}

console.log(recur(8, 0, 4, 0, true))
