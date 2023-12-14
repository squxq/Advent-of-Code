/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = 0; // sum of points of each individual line

  const lines: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(": ")[1]!.split(" | "));

  for (const line of lines) {
    let points: number = 0;

    const winningNumbers: string[] = line[0]!.split(/\s+/).filter(Boolean);
    const ourNumbers: string[] = line[1]!.split(/\s+/).filter(Boolean);

    for (const num of ourNumbers) {
      if (winningNumbers.includes(num)) {
        if (points !== 0) {
          points += points;
        } else {
          points = 1;
        }
      }
    }

    ans += points;
  }

  return ans;
}

export function part2(input: string): number {
  let ans: number = 0;

  const lines: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(": ")[1]!.split(" | "));

  const linesInfo: Array<{ game: number; points: number }> = [];

  for (let i: number = 0; i < lines.length; i++) {
    let points: number = 0;

    const winningNumbers: string[] = lines[i]![0]!.split(/\s+/).filter(Boolean);
    const ourNumbers: string[] = lines[i]![1]!.split(/\s+/).filter(Boolean);

    for (const num of ourNumbers) {
      if (winningNumbers.includes(num)) points++;
    }

    linesInfo.push({ game: i, points });
  }

  const pointsPerLine: number[] = Array(linesInfo.length).fill(NaN);

  function lineCards(index: number): number {
    let ans: number = linesInfo[index]!.points;

    for (let p: number = 1; p <= linesInfo[index]!.points; p++) {
      if (!Number.isNaN(pointsPerLine[index + p]))
        ans += pointsPerLine[index + p]!;
      else {
        const points: number = lineCards(index + p);
        ans += points;
        pointsPerLine[index + p] = points;
      }
    }

    return ans;
  }

  for (let i: number = 0; i < linesInfo.length; i++) {
    ans++;
    if (!Number.isNaN(pointsPerLine[i])) ans += pointsPerLine[i]!;
    else ans += lineCards(i);
  }

  return ans;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function run(): void {
  const inputContent: string = fs.readFileSync("./days/04/input.txt", "utf-8");

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
