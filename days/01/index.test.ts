import { part1, part2 } from "./index";

describe("part 1 - sample input", () => {
  test("line 1", () => {
    const result: number = part1("1abc2");
    expect(result).toBe(12);
  });

  test("line 2", () => {
    const result: number = part1("pqr3stu8vwx");
    expect(result).toBe(38);
  });

  test("line 3", () => {
    const result: number = part1("a1b2c3d4e5f");
    expect(result).toBe(15);
  });

  test("line 4", () => {
    const result: number = part1("treb7uchet");
    expect(result).toBe(77);
  });

  test("sample", () => {
    const result: number = part1(`
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
        `);
    expect(result).toBe(142);
  });
});

describe("part2 - sample input", () => {
  test("line 1", () => {
    const result: number = part2("two1nine");
    expect(result).toBe(29);
  });

  test("line 2", () => {
    const result: number = part2("eightwothree");
    expect(result).toBe(83);
  });

  test("line 3", () => {
    const result: number = part2("abcone2threexyz");
    expect(result).toBe(13);
  });

  test("line 4", () => {
    const result: number = part2("xtwone3four");
    expect(result).toBe(24);
  });

  test("line 5", () => {
    const result: number = part2("4nineeightseven2");
    expect(result).toBe(42);
  });

  test("line 6", () => {
    const result: number = part2("zoneight234");
    expect(result).toBe(14);
  });

  test("line 7", () => {
    const result: number = part2("7pqrstsixteen");
    expect(result).toBe(76);
  });

  test("sample", () => {
    const result: number = part2(`
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
    `);
    expect(result).toBe(281);
  });
});
