/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

function isSymbol(char: string | undefined): boolean {
  if (char === undefined) {
    return false;
  }
  return /[^0-9.]/.test(char);
}

function adjacentSymbol(
  start: number,
  end: number,
  row: number,
  matrix: string[][],
): boolean {
  if (isSymbol(matrix[row]![start - 1]) || isSymbol(matrix[row]![end + 1])) {
    return true;
  }

  for (let c: number = start - 1; c <= end + 1; c++) {
    if (
      (matrix[row - 1] !== undefined && isSymbol(matrix[row - 1]![c])) ||
      (matrix[row + 1] !== undefined && isSymbol(matrix[row + 1]![c]))
    ) {
      return true;
    }
  }

  return false;
}

export function part1(input: string): number {
  let ans: number = 0;

  const matrix: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));
  const height: number = matrix.length;
  const width: number = matrix[0]!.length;

  for (let row: number = 0; row < height; row++) {
    let partNumber: string = "";
    let start: number = 0;

    for (let col: number = 0; col <= width; col++) {
      const char: string = col !== width ? matrix[row]![col]! : ".";

      if (/^\d$/.test(char)) {
        if (partNumber.length === 0) {
          start = col;
        }
        partNumber += char;
      } else if (partNumber.length > 0) {
        if (adjacentSymbol(start, col - 1, row, matrix)) {
          ans += Number(partNumber);
        }
        partNumber = "";
        start = 0;
      }
    }
  }

  return ans;
}

export function part2(input: string): number {
  // code here
  return 0;
}

function run(): void {
  const inputContent: string = fs.readFileSync("./days/03/input.txt", "utf-8");

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
