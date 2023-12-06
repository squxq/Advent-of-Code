import { exec } from "child_process";
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = 0;
  const lines: string[] = input.trim().split("\n");

  for (const line of lines) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const firstDigit: string = line
      .split("")
      .find((char) => /^\d$/.test(char))!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const lastDigit: string = line
      .split("")
      .reverse()
      .find((char) => /^\d$/.test(char))!;
    ans += Number(firstDigit + lastDigit);
  }

  return ans;
}

async function run(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const childProcess = exec("jest", (error, stdout) => {
      if (error !== null) {
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });

    childProcess.on("error", (error) => {
      reject(error);
    });

    const inputContent: string = fs.readFileSync(
      "./days/01/input.txt",
      "utf-8",
    );

    const startTime = process.hrtime();
    const result: number = part1(inputContent);
    const endTime = process.hrtime();

    const elapsedTime =
      endTime[0] * 1e9 + endTime[1] - (startTime[0] * 1e9 + startTime[1]);

    console.log(`"part1" Execution Time: ${elapsedTime / 1e6} milisseconds.`);
    console.log(`"part1" Result: ${result}`);
  });
}

run()
  .then(() => {
    process.exit();
  })
  .catch((error) => {
    throw error;
  });
