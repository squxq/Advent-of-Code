import { part1 } from "./index";

describe("part 1 - sample input", () => {
  test("line 1", () => {
    const result: number = part1("467..114..");
    expect(result).toBe(0);
  });

  test("line 2", () => {
    const result: number = part1("...*......");
    expect(result).toBe(0);
  });

  test("line 3", () => {
    const result: number = part1("..35..633.");
    expect(result).toBe(0);
  });

  test("line 4", () => {
    const result: number = part1("......#...");
    expect(result).toBe(0);
  });

  test("line 5", () => {
    const result: number = part1("617*......");
    expect(result).toBe(617);
  });

  test("line 6", () => {
    const result: number = part1(".....+.58.");
    expect(result).toBe(0);
  });

  test("line 7", () => {
    const result: number = part1("..592.....");
    expect(result).toBe(0);
  });

  test("line 8", () => {
    const result: number = part1("......755.");
    expect(result).toBe(0);
  });

  test("line 9", () => {
    const result: number = part1("...$.*....");
    expect(result).toBe(0);
  });

  test("line 10", () => {
    const result: number = part1(".664.598..");
    expect(result).toBe(0);
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
