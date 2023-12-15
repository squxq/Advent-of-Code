/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = Number.MAX_SAFE_INTEGER;

  const parsedInput: string[] = input.trim().split("\n\n");
  const seeds: number[] = parsedInput.shift()!.split(" ").slice(1).map(Number);

  for (let seed of seeds) {
    for (const map of parsedInput) {
      const lines: string[] = map.split("\n").slice(1);

      for (const line of lines) {
        const [destination, source, length]: number[] = line
          .split(/\s+/)
          .map(Number);

        if (source! <= seed && seed < source! + length!) {
          seed += destination! - source!;
          break;
        }
      }
    }

    ans = Math.min(ans, seed);
  }

  return ans;
}

export function part2(input: string): number {
  let ans: number = Number.MAX_SAFE_INTEGER;

  const parsedInput: string[] = input.trim().split("\n\n");
  const priorSeeds: number[] = parsedInput
    .shift()!
    .split(" ")
    .slice(1)
    .map(Number);

  const seeds: number[][] = [];
  for (let i: number = 0; i < priorSeeds.length; i += 2) {
    seeds.push([priorSeeds[i]!, priorSeeds[i + 1]!]);
  }

  const maps: Array<Array<{ range: number[]; diff: number }>> = parsedInput.map(
    (map) => {
      const lines: string[] = map.split("\n").slice(1);

      return lines.map((line) => {
        const [destination, source, length]: number[] = line
          .split(/\s+/)
          .map(Number);

        return {
          range: [source!, source! + length!],
          diff: destination! - source!,
        };
      });
    },
  );

  for (const range of seeds) {
    const max: number = range[0]! + range[1]!;

    for (let s: number = range[0]!; s < max; s++) {
      let seed: number = s;

      for (const map of maps) {
        for (const { range, diff } of map) {
          if (range[0]! <= seed && seed < range[1]!) {
            seed += diff;
            break;
          }
        }
      }

      ans = Math.min(ans, seed);
    }
  }

  return ans;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function run(): void {
  const inputContent: string = fs.readFileSync("./days/05/input.txt", "utf-8");

  const startTimePart1 = process.hrtime();
  const resultPart1: number = part1(inputContent);
  const endTimePart1 = process.hrtime();

  const elapsedTimePart1 =
    endTimePart1[0] * 1e9 +
    endTimePart1[1] -
    (startTimePart1[0] * 1e9 + startTimePart1[1]);

  console.log(
    `"part1" Execution Time: ${elapsedTimePart1 / 1e6} milisseconds.`,
  );
  console.log(`"part1" Result: ${resultPart1}`);

  const startTimePart2 = process.hrtime();
  const resultPart2: number = part2(inputContent);
  const endTimePart2 = process.hrtime();

  const elapsedTimePart2 =
    endTimePart2[0] * 1e9 +
    endTimePart2[1] -
    (startTimePart2[0] * 1e9 + startTimePart2[1]);

  console.log(
    `"part2" Execution Time: ${elapsedTimePart2 / 1e6} milisseconds.`,
  );
  console.log(`"part2" Result: ${resultPart2}`);
}

run();
