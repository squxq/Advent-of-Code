/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

/** @typedef {"five_of_a_kind" | "four_of_a_kind" | "full_house" | "three_of_a_kind" | "two_pair" | "one_pair" | "high_card"} HandType */
type HandType =
  | "five_of_a_kind"
  | "four_of_a_kind"
  | "full_house"
  | "three_of_a_kind"
  | "two_pair"
  | "one_pair"
  | "high_card";

/** @typedef { type: HandType; hand: string; bid: number } HeapElement */
interface HeapElement {
  type: HandType;
  hand: string;
  bid: number;
}

/** @typedef {Array<HeapElement>} HeapType */
type HeapType = HeapElement[];

class MinHeapPriorityQueue {
  /** @type {HeapType} */
  heap: HeapType;

  /** @param {HeapType} heap */
  constructor(heap: HeapType) {
    this.heap = heap;
  }

  /**
   * @public
   * @returns {number}
   * produce the length of this.heap
   *
   * Stub:
   * length(): number {(...) return 0}
   */
  public length(): number {
    return this.heap.length;
  }

  /**
   * @public
   * @param {number} index
   * @returns {number}
   * given an index, index, return the index's element bid
   * ASSUME: 0 <= index < this.length()
   *
   * Stub:
   * bid(index: number): number {(...) return 0}
   */
  public bid(index: number): number {
    return this.heap[index]!.bid;
  }

  /**
   * @public
   * @param {string} hand
   * @param {number} bid
   * @returns {void}
   * insert given hand, hand, and its bid number, bid, into this.heap
   */
  public insert(hand: string, bid: number): void {
    this.heap.push({ type: this.detectType(hand), hand, bid });
    this.heapifyUp();
  }

  /**
   * @private
   * @param {string} hand
   * @returns {HandType}
   * detect given hand's, hand, type
   * ASSUME: hand.length === 5
   *
   * Stub:
   * detectType(hand: string): HandType {(...) return "five_of_a_kind"}
   */
  private detectType(hand: string): HandType {
    // code here
    return "five_of_a_kind";
  }

  /**
   * @private
   * @param {number = this.heap.length - 1} startIndex
   * @returns {void}
   *
   * Stub:
   * heapifyUp(startIndex: number = this.heap.length - 1): void {(...)}
   */
  private heapifyUp(startIndex: number = this.heap.length - 1): void {
    let currentIndex: number = startIndex;

    while (currentIndex > 0) {
      const parentIndex: number = Math.floor((currentIndex - 1) / 2);
      if (
        this.relativeStrength(this.heap[currentIndex]!, this.heap[parentIndex]!)
      ) {
        this.swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
      } else break;
    }
  }

  /**
   * @private
   * @param {HeapElement} element1
   * @param {HeapElement} element2
   * @returns {boolean}
   * produce true if given element1's priority is lower than given element2's priority
   *
   * Stub:
   * relativeStrength(element1: HeapElement, element2: HeapElement): boolean {(...) return false}
   */
  private relativeStrength(
    element1: HeapElement,
    element2: HeapElement,
  ): boolean {
    // code here
    return false;
  }

  /**
   * @private
   * @param {number} index1
   * @param {number} index2
   * @returns {void}
   * swap given index1's element with given index2's element in this.heap
   *
   * Stub:
   * swap(index1: number, index2: number): void {return (...)}
   */
  private swap(index1: number, index2: number): void {
    const temp: HeapElement = this.heap[index1]!;
    this.heap[index1] = this.heap[index2]!;
    this.heap[index2] = temp;
  }
}

export function part1(input: string): number {
  let ans: number = 0;

  const lines: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/));
  const heap = new MinHeapPriorityQueue([]);

  for (const line of lines) {
    heap.insert(line[0]!, Number(line[1]!));
  }

  for (let index: number = 0; index < heap.length(); index++) {
    ans += (index + 1) * heap.bid(index);
  }

  return ans;
}

export function part2(input: string): number {
  // code here
  return 0;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
function run(): void {
  const inputContent: string = fs.readFileSync("./days/07/input.txt", "utf-8");

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
