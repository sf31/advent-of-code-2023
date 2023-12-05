import { readLines } from "../utils";

(async () => {
  const input = await readLines("src/01/input");
  // console.log(getDigitsRegex("mfourjcxsvss3oneightlxh`"));
  const sumDigits = input.map(getDigits).reduce((a, b) => a + b, 0);
  const sumDigitsAndStrings = input
    .map(getDigitsRegex)
    .reduce((a, b) => a + b, 0);

  console.log(`Sum digits: ${sumDigits}`);
  console.log(`Sum digits and strings: ${sumDigitsAndStrings}`);
})();

function getDigits(line: string): number {
  const match = line.match(/\d/g);
  if (!match) throw new Error("No digit found");
  return mergeDigits(match[0], match[match.length - 1]);
}

function getDigitsRegex(line: string): number {
  const regex =
    /(oneight|twone|threeight|fiveight|nineight|one|two|three|four|five|six|seven|eight|nine|\d)/g;
  // const regex = /((\d|one|two|three|four|five|six|seven|eight|nine))/g;
  const match = line.match(regex);
  const list = match
    ?.map((m) => {
      if (m === "oneight") return ["one", "eight"];
      if (m === "twone") return ["two", "one"];
      if (m === "threeight") return ["three", "eight"];
      if (m === "fiveight") return ["five", "eight"];
      if (m === "nineight") return ["nine", "eight"];
      return [m];
    })
    .reduce((a, b) => a.concat(b), []);
  if (!list) throw new Error("No digit found");
  const first = getNumber(list[0]);
  const last = getNumber(list[list.length - 1]);
  return mergeDigits(`${first}`, `${last}`);
}

function mergeDigits(d1: string, d2: string): number {
  const firstAndLast = `${d1}${d2}`;
  return parseInt(firstAndLast);
}

function getNumber(str: string): number {
  if (!isNaN(parseInt(str))) return parseInt(str);
  const lookup: { [k: string]: number } = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  const lookupValue = lookup[str];
  if (!lookupValue) throw new Error("No lookup value found");
  return lookupValue;
}
