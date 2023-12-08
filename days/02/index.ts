/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

interface maxCounts {
  red: number;
  green: number;
  blue: number;
  [key: string]: number;
}

export interface getMaxCountsReturn {
  maxCounts: maxCounts;
  gameId: number;
}

export function getMaxCounts(line: string): getMaxCountsReturn {
  const maxCounts: maxCounts = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [gameId, subsetsString] = line.split(":");
  const subsets: string[] = subsetsString!.split(";");
  for (const set of subsets) {
    const cubes: string[] = set.split(",");
    for (let cube of cubes) {
      cube = cube.trim();
      const [num, color] = cube.split(" ");
      maxCounts[color!] = Math.max(maxCounts[color!]!, +num!);
    }
  }

  return { maxCounts, gameId: +gameId!.slice(5) };
}

export function part1(input: string): number {
  let ans: number = 0;
  const lines: string[] = input.trim().split("\n");

  for (const line of lines) {
    const { maxCounts, gameId } = getMaxCounts(line);

    if (maxCounts.red <= 12 && maxCounts.green <= 13 && maxCounts.blue <= 14) {
      ans += gameId;
    }
  }

  return ans;
}

export function part2(input: string): number {
  let power: number = 0;
  const lines: string[] = input.trim().split("\n");

  for (const line of lines) {
    const { maxCounts } = getMaxCounts(line);

    power += maxCounts.red * maxCounts.green * maxCounts.blue;
  }

  return power;
}

function run(): void {
  const inputContent: string = fs.readFileSync("./days/02/input.txt", "utf-8");

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
