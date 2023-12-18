/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

export function part1(input: string): number {
  let ans: number = 0;

  const lines: string[] = input.trim().split("\n");
  lines.splice(1, 1);

  const directions: string = lines.shift()!;

  const network: Record<string, { L: string; R: string }> = {};
  for (const line of lines) {
    const [node, nextElements] = line.split(" = ");
    const [left, right] = nextElements!
      .substring(1, nextElements!.length - 1)
      .split(", ");

    network[node!] = { L: left!, R: right! };
  }

  let current: string = "AAA";
  let direction: number = 0;

  while (current !== "ZZZ") {
    if (direction === directions.length) direction = 0;

    current = network[current]![directions[direction] as "L" | "R"];

    direction++;
    ans++;
  }

  return ans;
}

export function part2(input: string): number {
  let ans: number = 0;

  const lines: string[] = input.trim().split("\n");
  lines.splice(1, 1);

  const directions: string = lines.shift()!;

  const network: Record<string, { L: string; R: string }> = {};
  const startNodes: string[] = [];

  for (const line of lines) {
    const [node, nextElements] = line.split(" = ") as [string, string];
    const [left, right] = nextElements
      .substring(1, nextElements.length - 1)
      .split(", ") as [string, string];

    network[node] = { L: left, R: right };

    if (node[node.length - 1] === "A") startNodes.push(node);
  }

  let direction: number = 0;

  while (!startNodes.every((node) => node[node.length - 1] === "Z")) {
    if (direction === directions.length) direction = 0;

    for (let index: number = 0; index < startNodes.length; index++) {
      startNodes[index] =
        network[startNodes[index] as string]![
          directions[direction] as "L" | "R"
        ];
    }

    direction++;
    ans++;
  }

  return ans;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function run(): void {
  const inputContent: string = fs.readFileSync("./days/08/input.txt", "utf-8");

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
