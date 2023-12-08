import { getMaxCounts, part1, part2, type getMaxCountsReturn } from "./index";

describe("get max counts", () => {
  test("line 1", () => {
    const result: getMaxCountsReturn = getMaxCounts(
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    );

    expect(result).toStrictEqual({
      maxCounts: { red: 4, green: 2, blue: 6 },
      gameId: 1,
    });
  });

  test("line 2", () => {
    const result: getMaxCountsReturn = getMaxCounts(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    );

    expect(result).toStrictEqual({
      maxCounts: { red: 1, green: 3, blue: 4 },
      gameId: 2,
    });
  });

  test("line 3", () => {
    const result: getMaxCountsReturn = getMaxCounts(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    );

    expect(result).toStrictEqual({
      maxCounts: { red: 20, green: 13, blue: 6 },
      gameId: 3,
    });
  });

  test("line 4", () => {
    const result: getMaxCountsReturn = getMaxCounts(
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    );

    expect(result).toStrictEqual({
      maxCounts: { red: 14, green: 3, blue: 15 },
      gameId: 4,
    });
  });

  test("line 5", () => {
    const result: getMaxCountsReturn = getMaxCounts(
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    );

    expect(result).toStrictEqual({
      maxCounts: { red: 6, green: 3, blue: 2 },
      gameId: 5,
    });
  });
});

describe("part 1 - sample input", () => {
  test("line 1", () => {
    const result: number = part1(
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    );
    expect(result).toBe(1);
  });

  test("line 2", () => {
    const result: number = part1(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    );
    expect(result).toBe(2);
  });

  test("line 3", () => {
    const result: number = part1(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    );
    expect(result).toBe(0);
  });

  test("line 4", () => {
    const result: number = part1(
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    );
    expect(result).toBe(0);
  });

  test("line 5", () => {
    const result: number = part1(
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    );
    expect(result).toBe(5);
  });

  test("sample", () => {
    const result: number = part1(`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
      `);
    expect(result).toBe(8);
  });
});

describe("part 2 - sample input", () => {
  test("line 1", () => {
    const result: number = part2(
      "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
    );
    expect(result).toBe(48);
  });

  test("line 2", () => {
    const result: number = part2(
      "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
    );
    expect(result).toBe(12);
  });

  test("line 3", () => {
    const result: number = part2(
      "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
    );
    expect(result).toBe(1560);
  });

  test("line 4", () => {
    const result: number = part2(
      "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
    );
    expect(result).toBe(630);
  });

  test("line 5", () => {
    const result: number = part2(
      "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
    );
    expect(result).toBe(36);
  });

  test("sample", () => {
    const result: number = part2(`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
    `);
    expect(result).toBe(2286);
  });
});
