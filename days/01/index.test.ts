import { part1 } from "./index";

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
