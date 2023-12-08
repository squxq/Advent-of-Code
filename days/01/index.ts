/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = 0;
  const lines: string[] = input.trim().split("\n");

  for (const line of lines) {
    const firstDigit: string = line
      .split("")
      .find((char) => /^\d$/.test(char))!;
    const lastDigit: string = line
      .split("")
      .reverse()
      .find((char) => /^\d$/.test(char))!;
    ans += Number(firstDigit + lastDigit);
  }

  return ans;
}

export function part2(input: string): number {
  let ans: number = 0;
  const lines: string[] = input.trim().split("\n");
  const numberWords: Record<string, string> = {
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };

  const forwardPattern =
    /(\d)|(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/;
  const backwardPattern =
    /(\d)|(eno)|(owt)|(eerht)|(ruof)|(evif)|(xis)|(neves)|(thgie)|(enin)/;

  for (const line of lines) {
    const firstDigit: string = forwardPattern.exec(line)![0];
    const lastDigit: string = backwardPattern
      .exec(line.split("").reverse().join(""))![0]
      .split("")
      .reverse()
      .join("");

    ans += Number(
      (firstDigit.length > 1 ? numberWords[firstDigit] : firstDigit)! +
        (lastDigit.length > 1 ? numberWords[lastDigit] : lastDigit)!,
    );
  }

  return ans;
}

function run(): void {
  const inputContent: string = fs.readFileSync("./days/01/input.txt", "utf-8");

  const startTimePart1 = process.hrtime();
  const resultPart1: number = part1(inputContent);
  const endTimePart1 = process.hrtime();

  const elapsedTimePart1 =
    endTimePart1[0] * 1e9 +
    endTimePart1[1] -
    (startTimePart1[0] * 1e9 + startTimePart1[1]);

  console.log(
    `"part1" Execution Time: ${elapsedTimePart1 / 1e6} milisseconds.`,
  );
  console.log(`"part1" Result: ${resultPart1}`);

  const startTimePart2 = process.hrtime();
  const resultPart2: number = part2(inputContent);
  const endTimePart2 = process.hrtime();

  const elapsedTimePart2 =
    endTimePart2[0] * 1e9 +
    endTimePart2[1] -
    (startTimePart2[0] * 1e9 + startTimePart2[1]);

  console.log(
    `"part2" Execution Time: ${elapsedTimePart2 / 1e6} milisseconds.`,
  );
  console.log(`"part2" Result: ${resultPart2}`);
}

run();
