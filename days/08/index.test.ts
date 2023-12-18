import { part1, part2 } from ".";

describe("part 1 - sample input", () => {
  test("sample", () => {
    const result: number = part1(`
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`);
    expect(result).toBe(2);
  });

  test("sample 2", () => {
    const result: number = part1(`
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
    `);

    expect(result).toBe(6);
  });
});

describe("part 2 - sample input", () => {
  test("sample", () => {
    const result: number = part2(`
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
        `);

    expect(result).toBe(6);
  });
});
