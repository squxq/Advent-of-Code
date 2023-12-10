import { part1 } from "./index";

describe("part 1 - sample input", () => {
  test("line 1", () => {
    const result: number = part1(
      "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53",
    );

    expect(result).toBe(8);
  });

  test("line 2", () => {
    const result: number = part1(
      "Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19",
    );

    expect(result).toBe(2);
  });

  test("line 3", () => {
    const result: number = part1(
      "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1",
    );

    expect(result).toBe(2);
  });

  test("line 4", () => {
    const result: number = part1(
      "Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83",
    );

    expect(result).toBe(1);
  });

  test("line 5", () => {
    const result: number = part1(
      "Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36",
    );

    expect(result).toBe(0);
  });

  test("line 6", () => {
    const result: number = part1(
      "Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11",
    );

    expect(result).toBe(0);
  });

  test("sample", () => {
    const result: number = part1(`
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
    `);

    expect(result).toBe(13);
  });
});
