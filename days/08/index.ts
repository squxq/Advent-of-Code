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

/** return the greatest common divisor between given numbers, a & b
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp: number = b;
    b = a % b;
    a = temp;
  }

  return a;
}

/** return the least commom multiple in the given number array, set
 * ASSUME: set.length >= 1
 * @param {number[]} set
 * @returns  number
 */
function lcm(set: number[]): number {
  let ans: number = set[0]!;

  for (let index: number = 1; index < set.length; index++) {
    ans = ans * (set[index]! / gcd(ans, set[index] as number));
  }

  return ans;
}

export function part2(input: string): number {
  const lines: string[] = input.trim().split("\n");
  lines.splice(1, 1);

  const directions: string = lines.shift()!;

  const network: Record<string, { L: string; R: string }> = {};
  const nodes: string[] = [];

  for (const line of lines) {
    const [node, nextElements] = line.split(" = ") as [string, string];
    const [left, right] = nextElements
      .substring(1, nextElements.length - 1)
      .split(", ") as [string, string];

    network[node] = { L: left, R: right };

    if (node[node.length - 1] === "A") nodes.push(node);
  }

  let direction: number = 0;
  let iterations: number = 0;
  const cycles: number[] = [];
  const startNodesLen: number = nodes.length;

  while (cycles.length < startNodesLen) {
    iterations++;
    if (direction === directions.length) direction = 0;

    // update all of the nodes that have not found the finish node: "ending with 'Z'"
    // if a node found its finish node, remove it from the nodes we are looking for & add its cycle number
    for (let index: number = 0; index < nodes.length; index++) {
      const nextNode: string =
        network[nodes[index] as string]![directions[direction] as "L" | "R"];

      if (nextNode[nextNode.length - 1] === "Z") {
        nodes.splice(index, 1);
        cycles.push(iterations);
        index--;
      } else {
        nodes[index] = nextNode;
      }
    }

    direction++;
  }

  return lcm(cycles);
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
