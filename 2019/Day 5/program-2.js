const fs = require("fs");

const input = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

let updateArray = (array, index) => {
  if (array[index] == 1) {
    array[array[index + 3]] = array[array[index + 1]] + array[array[index + 2]];
  } else if (array[index] == 2) {
    array[array[index + 3]] = array[array[index + 1]] * array[array[index + 2]];
  }
};

let positionOne = 0;
let positionTwo = 0;

for (let j = 0; j < 10000; j++) {
  positionOne = Math.floor(j / 100);
  positionTwo = j % 100;

  let testInput = [...input];
  testInput[1] = positionOne;
  testInput[2] = positionTwo;

  for (let i = 0; i < testInput.length; i += 4) {
    if (testInput[i] === 99) {
      break;
    }

    updateArray(testInput, i);
  }

  if (testInput[0] === 19690720) {
    console.log(`positionOne:${positionOne}, positionTwo:${positionTwo}`);
    break;
  }
}
