

let count = 1
function makeCounter() {
    return function() {
        return count++
    }
}

export const counter = makeCounter()