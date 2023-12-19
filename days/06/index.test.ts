import { part1, part2 } from "./index";

describe("part 1 - sample input", () => {
  test("column 1", () => {
    const result: number = part1(`
Time:      7
Distance:  9
`);
    expect(result).toBe(4);
  });

  test("column 2", () => {
    const result: number = part1(`
Time:      15
Distance:  40
    `);

    expect(result).toBe(8);
  });

  test("column 3", () => {
    const result: number = part1(`
Time:      30
Distance:  200
    `);

    expect(result).toBe(9);
  });

  test("sample", () => {
    const result: number = part1(`
Time:      7  15   30
Distance:  9  40  200
        `);

    expect(result).toBe(288);
  });
});

describe("part 2 - sample input", () => {
  test("sample", () => {
    const result: number = part2(`
Time:      7  15   30
Distance:  9  40  200
`);

    expect(result).toBe(71503);
  });
});
