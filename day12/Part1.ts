import {readFileSync} from 'fs';

let input = readFileSync('./input.txt', 'utf-8').toString().split("\n").map((item) => item.split('-'))

//https://en.wikipedia.org/wiki/Depth-first_search
const dfs = (u: string) => {
    if (u == 'end') {
        paths += 1
    }
    visited.set(u, true)
    for (const v of graph.get(u)!) {
        if (!visited.get(v) || v == v.toUpperCase()) {
            dfs(v)
        }
    }
    visited.set(u, false)
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

const visited = new Map<string, boolean>()
graph.forEach((value, key) => visited.set(key, false))
visited.set('start', true)
let paths = 0
dfs('start')

console.log(paths)