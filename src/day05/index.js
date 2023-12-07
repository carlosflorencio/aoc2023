import run from "aocrunner"

const parseInput = (rawInput) => {
  const lines = rawInput.split("\n")
  const seeds = lines[0]
    .split(": ")[1]
    .split(" ")
    .map((x) => parseInt(x))

  const maps = []

  let currentMap = []
  for (let i = 3; i < lines.length; i++) {
    const line = lines[i]

    if (line.trim().length === 0) {
      maps.push(currentMap)
      currentMap = []
      continue
    }

    if (line.indexOf("map") !== -1) continue

    currentMap.push(line.split(" ").map((x) => parseInt(x)))
  }
  maps.push(currentMap)

  return {
    seeds,
    maps,
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput)

  let location = Number.MAX_SAFE_INTEGER
  for (const seed of input.seeds) {
    const loc = getSeedLocation(seed, input.maps)
    if (loc < location) {
      location = loc
    }
  }

  return location
}

// brute force
const part2 = (rawInput) => {
  const input = parseInput(rawInput)

  let first = input.maps[0].map((x) => ({
    start: x[1],
    end: x[1] + x[2],
  }))

  let location = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < input.seeds.length; i += 2) {
    let start = input.seeds[i]
    let end = start + input.seeds[i + 1] - 1
    let loc = Number.MAX_SAFE_INTEGER

    for (let j = 0; j < first.length; j++) {
      let overlap =
        Math.min(end, first[j].end) - Math.max(start, first[j].start)

      if (overlap >= 0) {
        let overLapStart = start >= first[j].start ? start : first[j].start
        let overLapEnd = end <= first[j].end ? end : first[j].end

        for (let k = overLapStart; k <= overLapEnd; k++) {
          loc = getSeedLocation(k, input.maps)
          if (loc < location) {
            location = loc
          }
        }

        break
      }
    }
  }

  return location
}

function getSeedLocation(seed, maps) {
  let loc = seed
  for (let map of maps) {
    for (const line of map) {
      const [dest, src, range] = line

      if (src <= loc && loc < src + range) {
        loc = dest + (loc - src)
        break
      }
    }
  }

  return loc
}

const input = `
        seeds: 79 14 55 13

        seed-to-soil map:
        50 98 2
        52 50 48

        soil-to-fertilizer map:
        0 15 37
        37 52 2
        39 0 15

        fertilizer-to-water map:
        49 53 8
        0 11 42
        42 0 7
        57 7 4

        water-to-light map:
        88 18 7
        18 25 70

        light-to-temperature map:
        45 77 23
        81 45 19
        68 64 13

        temperature-to-humidity map:
        0 69 1
        1 0 69

        humidity-to-location map:
        60 56 37
        56 93 4
        `

run({
  part1: {
    tests: [
      {
        input,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input,
        expected: 46,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
})
