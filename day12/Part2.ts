import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => item.split('-'))

//https://en.wikipedia.org/wiki/Depth-first_search
const dfs = (u: string, b: boolean) => {
    if (u == 'end') {
        paths += 1
        return
    }
    visited.set(u, visited.get(u)! + 1)
    for (const v of graph.get(u)!) {
        if (v == v.toUpperCase()) {
            dfs(v, b)
        } else if (visited.get(v)! == 0) {
            dfs(v, b)
        } else if (visited.get(v)! == 1 && !b) {
            dfs(v, true)
        }
    }

    visited.set(u, visited.get(u)! - 1)
}


let graph = new Map<string, string[]>()
for (const entry of input) {
    const [u, v] = entry
    if (!graph.has(u)) {
        graph.set(u, [])
    }
    if (!graph.has(v)) {
        graph.set(v, [])
    }
    graph.set(u, graph.get(u)!.concat([v]))
    graph.set(v, graph.get(v)!.concat([u]))
}

const visited = new Map<string, number>()
graph.forEach((value, key) => visited.set(key, 0))
visited.set('start', 2)
let paths = 0
dfs('start', false)

console.log(paths)