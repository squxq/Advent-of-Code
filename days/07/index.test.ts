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
});
