/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

/**
 * @callback Callback
 * @param {number} start
 * @param {number} col
 * @param {number} row
 * @param {string} partNumber
 * @returns {void}
 */
type Callback = (
  start: number,
  col: number,
  row: number,
  partNumber: string,
) => void;

class Helpers {
  /** return true if given char is a symbol - not a digit nor a "."
   * @param {string | undefined} char
   * @returns {boolean}
   */
  private isSymbol(char: string | undefined): boolean {
    if (char === undefined) {
      return false;
    }
    return /[^0-9.]/.test(char);
  }

  /** return true there is a symbol (previously defined) in any of the below indexes; otherwise return false:
   * - matrix[row - 1][start - 1] -> matrix[row - 1][end + 1]
   * - matrix[row][start - 1] & matrix[row][end + 1]
   * - matrix[row + 1][start - 1] -> matrix[row + 1][end + 1]
   * @param {number} start
   * @param {number} end
   * @param {number} row
   * @param {string[][]} matrix
   * @returns {boolean}
   */
  public adjacentSymbol(
    start: number,
    end: number,
    row: number,
    matrix: string[][],
  ): boolean {
    if (
      this.isSymbol(matrix[row]![start - 1]) ||
      this.isSymbol(matrix[row]![end + 1])
    ) {
      return true;
    }

    for (let c: number = start - 1; c <= end + 1; c++) {
      if (
        (matrix[row - 1] !== undefined && this.isSymbol(matrix[row - 1]![c])) ||
        (matrix[row + 1] !== undefined && this.isSymbol(matrix[row + 1]![c]))
      ) {
        return true;
      }
    }

    return false;
  }

  /** return all the positions, if they exist, of "*" in any of the previously defined indexes
   * @param {number} start
   * @param {number} end
   * @param {number} row
   * @param {string[][]} matrix
   * @returns {Array<{ col: number; row: number }>}
   */
  public adjacentStar(
    start: number,
    end: number,
    row: number,
    matrix: string[][],
  ): Array<{ col: number; row: number }> {
    const result: Array<{ col: number; row: number }> = [];

    matrix[row]![start - 1] === "*" && result.push({ col: start - 1, row });
    matrix[row]![end + 1] === "*" && result.push({ col: end + 1, row });

    for (let col: number = start - 1; col <= end + 1; col++) {
      matrix[row - 1]?.[col] === "*" && result.push({ col, row: row - 1 });
      matrix[row + 1]?.[col] === "*" && result.push({ col, row: row + 1 });
    }

    return result;
  }

  /** given a function, callback, and a matrix, traverse the matrix and produce callback when a number is found
   * @param {string[][]} matrix
   * @param {Callback} callback
   * @returns {void}
   */
  public traverseMatrix(matrix: string[][], callback: Callback): void {
    const height: number = matrix.length;
    const width: number = matrix[0]!.length;

    for (let row: number = 0; row < height; row++) {
      let partNumber: string = "";
      let start: number = 0;

      for (let col: number = 0; col <= width; col++) {
        const char: string =
          col !== width ? (matrix[row]![col] as string) : ".";

        if (/^\d$/.test(char)) {
          if (partNumber.length === 0) {
            start = col;
          }
          partNumber += char;
        } else if (partNumber.length > 0) {
          callback(start, col, row, partNumber);

          partNumber = "";
          start = 0;
        }
      }
    }
  }
}

export function part1(input: string): number {
  let ans: number = 0;

  const matrix: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const helpers: Helpers = new Helpers();

  helpers.traverseMatrix(
    matrix,
    (start: number, col: number, row: number, partNumber: string) => {
      if (helpers.adjacentSymbol(start, col - 1, row, matrix)) {
        ans += Number(partNumber);
      }
    },
  );

  return ans;
}

export function part2(input: string): number {
  const adjacentStars: Record<string, number[]> = {};

  const matrix: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(""));

  const helpers: Helpers = new Helpers();

  helpers.traverseMatrix(
    matrix,
    (start: number, col: number, row: number, partNumber: string) => {
      const stars: Array<{ col: number; row: number }> = helpers.adjacentStar(
        start,
        col - 1,
        row,
        matrix,
      );

      stars.forEach(({ col, row }: { col: number; row: number }) => {
        const key: string = `${col},${row}`;

        if (adjacentStars[key] !== undefined) {
          adjacentStars[key]!.push(Number(partNumber));
        } else {
          adjacentStars[key] = [Number(partNumber)];
        }
      });
    },
  );

  return Object.entries(adjacentStars).reduce(
    (acc: number, [, value]: [string, number[]]) => {
      if (value.length === 2) {
        return acc + value[0]! * value[1]!;
      }
      return acc;
    },
    0,
  );
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
