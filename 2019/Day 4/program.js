const _ = require("lodash");

const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("-")
  .map(val => parseInt(val));

const start = input[0];
const end = input[1];

let onlyIncreases = numbers => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] < numbers[i - 1]) {
      return false;
    }
  }

  return true;
};

let atLeastDouble = numbers => {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] === numbers[i - 1]) {
      return true;
    }
  }

  return false;
};

let onlyDouble = numbers => {
  for (let i = 1; i < numbers.length; i++) {
    if (
      numbers[i] === numbers[i - 1] &&
      numbers[i] !== numbers[i - 2] &&
      numbers[i] !== numbers[i + 1]
    ) {
      return true;
    }
  }

  return false;
};

let part1 = (start, end) => {
  let combinations = [];

  for (let i = start; i <= end; i++) {
    const numbers = i
      .toString()
      .split("")
      .map(x => parseInt(x));

    if (onlyIncreases(numbers) && atLeastDouble(numbers)) {
      combinations.push(i);
    }
  }

  console.log(combinations.length);
};

let part2 = (start, end) => {
  let combinations = [];

  for (let i = start; i <= end; i++) {
    const numbers = i
      .toString()
      .split("")
      .map(x => parseInt(x));

    if (onlyIncreases(numbers) && onlyDouble(numbers)) {
      combinations.push(i);
    }
  }

  console.log(combinations.length);
};

part1(start, end);
part2(start, end);
