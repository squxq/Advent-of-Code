/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = 1;

  const parsedInput: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1));

  const races: Array<{ time: number; distance: number }> = parsedInput[0]!.map(
    (time, index) => {
      return { time: Number(time), distance: Number(parsedInput[1]![index]!) };
    },
  );

  for (const { time, distance } of races) {
    let numWaysToWin: number = 0;
    // get number different ways that is possible to win in race and multiply it with ans
    for (let hold: number = 1; hold < time; hold++) {
      if ((time - hold) * hold > distance) numWaysToWin++;
    }

    if (numWaysToWin > 1) ans *= numWaysToWin;
  }

  return ans;
}

export function part2(input: string): number {
  const parsedInput: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/).slice(1));

  const time: number = Number(parsedInput[0]!.join(""));
  const distance: number = Number(parsedInput[1]!.join(""));

  const left0: number = Math.ceil(
    (-time + Math.sqrt(time ** 2 - 4 * distance)) / 2,
  );
  const right0: number = Math.floor(
    (-time - Math.sqrt(time ** 2 - 4 * distance)) / 2,
  );

  return Math.abs(right0 - left0) - 1;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function run(): void {
  const inputContent: string = fs.readFileSync("./days/06/input.txt", "utf-8");

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
