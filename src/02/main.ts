import { readLines } from "../utils";

(async () => {
  const lines = await readLines("src/02/input");
  const sum = lines
    .map((l) => {
      const { game, setList } = splitGame(l);
      return isGamePossible(setList) ? game : 0;
    })
    .reduce((acc, item) => acc + item, 0);

  console.log(`Sum: ${sum}`);

  const power = lines
    .map((l) => {
      const { setList } = splitGame(l);
      const max = getMax(setList);
      return max.red * max.green * max.blue;
    })
    .reduce((acc, item) => acc + item, 0);

  console.log(`Power: ${power}`);
})();

function splitGame(line: string): { game: number; setList: string[] } {
  const split = line.split(":");
  return {
    game: parseInt(split[0].substring(5)),
    setList: split[1].split(";"),
  };
}

function isGamePossible(setList: string[]): boolean {
  return setList.map(isSetPossible).reduce((a, i) => a && i, true);
}

function isSetPossible(set: string): boolean {
  const rounds = set.split(",");
  return rounds.reduce((acc, item) => acc && isRoundPossible(item), true);
}

function isRoundPossible(round: string): boolean {
  const map: { [k: string]: number } = { red: 12, green: 13, blue: 14 };
  const [count, color] = round.trim().split(" ");
  if (map[color] === undefined) throw new Error(`Invalid color: ${color}`);
  return parseInt(count) <= map[color];
}

function getMax(setList: string[]): {
  red: number;
  green: number;
  blue: number;
} {
  let red = 1;
  let green = 1;
  let blue = 1;

  for (const set of setList) {
    const byColor = getSetByColor(set);
    for (const by of byColor) {
      if (by.color === "red") red = by.count > red ? by.count : red;
      if (by.color === "green") green = by.count > green ? by.count : green;
      if (by.color === "blue") blue = by.count > blue ? by.count : blue;
    }
  }

  return { red, green, blue };
}

function getSetByColor(set: string): { color: string; count: number }[] {
  const rounds = set.split(",");
  return rounds.map(getRoundByColor);
}

function getRoundByColor(round: string): { color: string; count: number } {
  const [count, color] = round.trim().split(" ");
  return { color, count: parseInt(count) };
}
