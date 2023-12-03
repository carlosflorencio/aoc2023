import run from "aocrunner"

const parseInput = (rawInput) => {
  const map = []

  rawInput.split("\n").forEach((line) => {
    map.push(line.split(""))
  })

  return map
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const ch = input[y][x]

      if (ch != "." && !isNumber(ch)) {
        // symbol
        const adjacent = visitAdjacent(input, x, y)
        sum += adjacent.reduce((prev, acc) => acc + prev, 0)
      }
    }
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      const ch = input[y][x]

      if (ch == "*") {
        let adjacent = visitAdjacent(input, x, y)

        if (adjacent.length === 2) {
          sum += adjacent.reduce((prev, acc) => acc * prev, 1)
        }
      }
    }
  }

  return sum
}

function isNumber(ch) {
  return ch >= "0" && ch <= "9"
}

function visitAdjacent(input, x, y) {
  let adjacent = []

  adjacent.push(getAdjacentNumberHorizontal(input, x + 1, y)) // right
  adjacent.push(getAdjacentNumberHorizontal(input, x - 1, y)) // left
  adjacent.push(getAdjacentNumberHorizontal(input, x, y + 1)) // bottom
  adjacent.push(getAdjacentNumberHorizontal(input, x, y - 1)) // top
  adjacent.push(getAdjacentNumberHorizontal(input, x - 1, y - 1)) // top left
  adjacent.push(getAdjacentNumberHorizontal(input, x + 1, y - 1)) // top right
  adjacent.push(getAdjacentNumberHorizontal(input, x + 1, y + 1)) // bottom right
  adjacent.push(getAdjacentNumberHorizontal(input, x - 1, y + 1)) // bottom left

  return adjacent.filter((v) => v !== null)
}

function getAdjacentNumberHorizontal(map, x, y) {
  let rightIdx = x
  let leftIdx = x
  let ch = map[y][x]

  if (ch === undefined || !isNumber(ch)) {
    return null
  }

  let num = ch
  map[y][x] = "." // mark visited

  // left
  while (rightIdx++ < map[y].length) {
    const ch = map[y][rightIdx]
    if (isNumber(ch)) {
      num += ch
      map[y][rightIdx] = "." // mark visited
    } else {
      break
    }
  }

  while (leftIdx-- >= 0) {
    const ch = map[y][leftIdx]
    if (isNumber(ch)) {
      num = ch + num
      map[y][leftIdx] = "." // mark visited
    } else {
      break
    }
  }

  return parseInt(num)
}

const input = `
        467..114..
        ...*......
        ..35..633.
        ......#...
        617*......
        .....+.58.
        ..592.....
        ......755.
        ...$.*....
        .664.598..
        `
run({
  part1: {
    tests: [
      {
        input,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
