import { part1, part2 } from "./index";

describe("part 1 - sample input", () => {
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
