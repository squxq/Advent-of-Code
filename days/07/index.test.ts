import { part1 } from ".";

describe("part 1 -sample input", () => {
  test("sample", () => {
    const result: number = part1(`
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
        `);

    expect(result).toBe(6440);
  });

  test("example 2", () => {
    const result: number = part1(`
AAAAA 2
22222 3
AAAAK 5
22223 7
AAAKK 11
22233 13
AAAKQ 17
22234 19
AAKKQ 23
22334 29
AAKQJ 31
22345 37
AKQJT 41
23456 43`);

    expect(result).toBe(1343);
  });
});
