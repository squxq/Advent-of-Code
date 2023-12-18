/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as fs from "fs";

/** @typedef {"A" | "K" | "Q" | "J" | "T" | "9" | "8" | "7" | "6" | "5" | "4" | "3" | "2"} */
type CardType =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

/** @typedef {"five_of_a_kind" | "four_of_a_kind" | "full_house" | "three_of_a_kind" | "two_pair" | "one_pair" | "high_card"} HandType */
type HandType =
  | "five_of_a_kind"
  | "four_of_a_kind"
  | "full_house"
  | "three_of_a_kind"
  | "two_pair"
  | "one_pair"
  | "high_card";

/** @typedef { type: HandType; hand: string; bid: number } QueueElement */
interface QueueElement {
  type: HandType;
  hand: string;
  bid: number;
}

/** @typedef {Array<QueueElement>} QueueType */
type QueueType = QueueElement[];

class PriorityQueue {
  /** @type {QueueType} */
  queue: QueueType;

  /** @type {"part1" | "part2"} */
  part: "part1" | "part2";

  /** @type {Record<HandType, number>} */
  handTypes: Record<HandType, number>;

  /** @type {{ part1: Record<CardType, number>; part2: Record<CardType, number> }} */
  cards: { part1: Record<CardType, number>; part2: Record<CardType, number> };

  /**
   * @param {QueueType} queue
   * @param {"part1" | "part2"} part
   */
  constructor(queue: QueueType = [], part: "part1" | "part2") {
    this.queue = queue;
    this.part = part;

    this.handTypes = {
      five_of_a_kind: 6,
      four_of_a_kind: 5,
      full_house: 4,
      three_of_a_kind: 3,
      two_pair: 2,
      one_pair: 1,
      high_card: 0,
    };

    this.cards = {
      part1: {
        A: 12,
        K: 11,
        Q: 10,
        J: 9,
        T: 8,
        "9": 7,
        "8": 6,
        "7": 5,
        "6": 4,
        "5": 3,
        "4": 2,
        "3": 1,
        "2": 0,
      },
      part2: {
        A: 12,
        K: 11,
        Q: 10,
        T: 9,
        "9": 8,
        "8": 7,
        "7": 6,
        "6": 5,
        "5": 4,
        "4": 3,
        "3": 2,
        "2": 1,
        J: 0,
      },
    };
  }

  /**
   * @public
   * @returns {number}
   * produce the length of this.queue
   *
   * Stub:
   * length(): number {(...) return 0}
   */
  public get length(): number {
    return this.queue.length;
  }

  /**
   * @public
   * @returns {QueueType}
   * return this.queue
   *
   * Stub: getQueue(): QueueType {(...) return []}
   */
  public get getQueue(): QueueType {
    return this.queue;
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
    return this.queue[index]!.bid;
  }

  /**
   * @public
   * @param {string} hand
   * @param {number} bid
   * @returns {void}
   * insert given hand, hand, and its bid number, bid, into this.queue
   */
  public insert(hand: string, bid: number): void {
    const element: QueueElement = { type: this.detectType(hand), hand, bid };
    let contain: boolean = false;

    for (let i: number = 0; i < this.length; i++) {
      if (this.relativeStrength(this.queue[i]!, element)) {
        this.queue.splice(i, 0, element);
        contain = true;
        break;
      }
    }

    if (!contain) this.queue.push(element);
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
    let maxFrequency: number = 0;
    let mostRepeatedCard: string = "";

    const cards: Record<string, number> = {};

    for (const card of hand) {
      const currentFrequency: number = (cards[card] ?? 0) + 1;
      cards[card] = currentFrequency;

      if (currentFrequency > maxFrequency && card !== "J") {
        maxFrequency = currentFrequency;
        mostRepeatedCard = card;
      }
    }

    if (this.part === "part2" && cards.J !== undefined) {
      cards[mostRepeatedCard] += cards.J;
      delete cards.J;
    }

    const numKeys: number = Object.keys(cards).length;
    const values: number[] = Object.values(cards);

    switch (true) {
      case numKeys === 1:
        return "five_of_a_kind";
      case numKeys === 2 && (values[0] === 4 || values[1] === 4):
        return "four_of_a_kind";
      case numKeys === 2:
        return "full_house";
      case numKeys === 3 &&
        (values[0] === 3 || values[1] === 3 || values[2] === 3):
        return "three_of_a_kind";
      case numKeys === 3:
        return "two_pair";
      case numKeys === 4:
        return "one_pair";
      default:
        return "high_card";
    }
  }

  /**
   * @private
   * @param {QueueElement} element1
   * @param {QueueElement} element2
   * @returns {boolean}
   * produce true if given element1's priority is greater than given element2's priority
   *
   * Stub:
   * relativeStrength(element1: QueueElement, element2: QueueElement): boolean {(...) return false}
   */
  private relativeStrength(
    element1: QueueElement,
    element2: QueueElement,
  ): boolean {
    if (element1.type === element2.type) {
      return this.strongerCards(element1.hand, element2.hand);
    }

    return this.handTypes[element1.type] > this.handTypes[element2.type];
  }

  /**
   * @private
   * @param {string} hand1
   * @param {string} hand2
   * @returns {boolean}
   * produce true if hand1 has stronger cards than hand2
   * ASSUME: hand1.length === hand2.length === 5
   *
   * Stub:
   * strongerCards(hand1: string, hand2: string): boolean {(...) return false}
   */
  private strongerCards(hand1: string, hand2: string): boolean {
    for (let index: number = 0; index < 5; index++) {
      if (hand1[index] !== hand2[index]) {
        return (
          this.cards[this.part][hand1[index] as CardType] >
          this.cards[this.part][hand2[index] as CardType]
        );
      }
    }

    return false;
  }
}

export function part1(input: string): number {
  let ans: number = 0;

  const lines: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/));
  const queue = new PriorityQueue([], "part1");

  for (const line of lines) {
    queue.insert(line[0]!, Number(line[1]!));
  }

  for (let index: number = 0; index < queue.length; index++) {
    ans += (index + 1) * queue.bid(index);
  }

  return ans;
}

export function part2(input: string): number {
  let ans: number = 0;

  const lines: string[][] = input
    .trim()
    .split("\n")
    .map((line) => line.split(/\s+/));
  const queue = new PriorityQueue([], "part2");

  for (const line of lines) {
    queue.insert(line[0]!, Number(line[1]!));
  }

  console.log(queue.getQueue);
  for (let index: number = 0; index < queue.length; index++) {
    ans += (index + 1) * queue.bid(index);
  }

  return ans;
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
