import run from "aocrunner"

const parseInput = (rawInput) => {
  return rawInput.split("\n").map((line) => {
    const parts = line.split(":")
    const cardNumber = parseInt(parts[0].split(" ")[1])

    const numbers = parts[1].trim().split("|")
    const winningNumbers = numbers[0]
      .trim()
      .split(" ")
      .filter((x) => x.trim().length > 0)
      .map((x) => parseInt(x))
    const gameNumbers = numbers[1]
      .trim()
      .split(" ")
      .filter((x) => x.trim().length > 0)
      .map((x) => parseInt(x))

    return {
      card: cardNumber,
      winningNumbers,
      gameNumbers,
    }
  })
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let sum = 0
  for (const card of input) {
    let points = 0
    const winNumMap = {}
    card.winningNumbers.forEach((num) => {
      winNumMap[num] = true
    })

    card.gameNumbers.forEach((num) => {
      if (winNumMap[num]) {
        points = points === 0 ? 1 : points * 2
      }
    })

    sum += points
  }

  return sum
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput)
  const cards = input.map(() => 1)

  for (let i = 0; i < input.length; i++) {
    const card = input[i]
    const winNumMap = {}
    card.winningNumbers.forEach((num) => {
      winNumMap[num] = true
    })

    let count = 0
    card.gameNumbers.forEach((num) => {
      if (winNumMap[num]) {
        count++
      }
    })

    for (let j = 0; j < count; j++) {
      cards[i + 1 + j] += cards[i]
    }
  }

  return cards.reduce((prev, acc) => prev + acc, 0)
}

run({
  part1: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
        `,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
})
