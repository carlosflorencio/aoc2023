import run from "aocrunner"

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => {
    const [left, right] = line.split(": ")

    const revealed = {}

    const rounds = right.split(";")
    rounds.forEach((round) => {
      round.split(", ").forEach((cube) => {
        const [count, color] = cube.trim().split(" ")

        if (!revealed[color]) {
          revealed[color] = [count]
        } else {
          revealed[color].push(parseInt(count))
        }
      })
    })

    return {
      game: parseInt(left.split(" ")[1]),
      revealed,
    }
  })

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  const limits = {
    red: 12,
    green: 13,
    blue: 14,
  }

  function lost(gameObj) {
    for (const color in gameObj.revealed) {
      const max = Math.max(...gameObj.revealed[color])
      if (max > limits[color]) {
        return true
      }
    }
    return false
  }

  let total = 0
  for (const gameObj of input) {
    if (!lost(gameObj)) {
      total += gameObj.game
    }
  }

  return total
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let total = 0
  for (const gameObj of input) {
    let power = 1
    for (const color in gameObj.revealed) {
      const max = Math.max(...gameObj.revealed[color])
      power *= max
    }

    total += power
  }

  return total
}

const input = `
        Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
        `

run({
  part1: {
    tests: [
      {
        input,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
