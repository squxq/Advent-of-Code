import { part1, part2 } from "./index";

describe("part 1 - sample input", () => {
  test("line 1", () => {
    const result: number = part1("467..114..");
    expect(result).toBe(0);
  });

  test("line 2", () => {
    const result: number = part1("...*......");
    expect(result).toBe(0);
  });

  test("line 5", () => {
    const result: number = part1("617*......");
    expect(result).toBe(617);
  });

  test("example 1", () => {
    const result: number = part1(`
.....+.58.
..592.....
    `);
    expect(result).toBe(592);
  });

  test("example 2", () => {
    const result: number = part1(`
......755.
...$.*....
.664.598..
    `);
    expect(result).toBe(755 + 664 + 598);
  });

  test("sample", () => {
    const result: number = part1(`
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
    `);
    expect(result).toBe(4361);
  });
});

describe("part 2 - sample input", () => {
  test("example 1", () => {
    const result: number = part2(`
467..114..
...*......
..35..633.
    `);

    expect(result).toBe(16345); // 467 * 35
  });

  test("example 2 - not a gear", () => {
    const result: number = part2("617*......");

    expect(result).toBe(0); // the * adjacent to 617 is not a gear because it is only adjacent to a single part number
  });

  test("example 3", () => {
    const result: number = part2(`
......755.
...$.*....
.664.598..
    `);

    expect(result).toBe(451490);
  });

  test("sample", () => {
    const result: number = part2(`
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

    `);
    expect(result).toBe(467835); // 451490 + 16345
  });
});
