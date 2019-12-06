// Just read in the file. Create an array and make sure all the values are integers
const fs = require("fs");
const input = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

part1 = arg => {
  for (let i = 0; i < input.length; i++) {
    const instruction = input[i].toString();

    const opCode = parseInt(instruction.slice(-2));
    const firstParam =
      parseInt(instruction.charAt(instruction.length - 3)) || 0;
    const secondParam =
      parseInt(instruction.charAt(instruction.length - 4)) || 0;

    const firstVal = firstParam === 1 ? input[i + 1] : input[input[i + 1]];
    const secondVal = secondParam === 1 ? input[i + 2] : input[input[i + 2]];

    switch (opCode) {
      case 1:
        input[input[i + 3]] = firstVal + secondVal;
        i += 3;
        break;
      case 2:
        input[input[i + 3]] = firstVal * secondVal;
        i += 3;
        break;
      case 3:
        input[input[i + 1]] = arg;
        i += 1;
        break;
      case 4:
        firstVal > 0 && console.log(`Answer: ${firstVal}`);
        i += 1;
        break;
      case 99:
        return;
    }
  }
};
part1(1);
