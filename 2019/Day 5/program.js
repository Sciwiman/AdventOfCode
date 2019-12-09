const fs = require("fs");
const file = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

algorithm = arg => {
  const input = [...file];

  for (let i = 0; i < input.length; i++) {
    const instruction = input[i].toString();
    const opCode = parseInt(instruction.slice(-2));

    const firstParam =
      parseInt(instruction.charAt(instruction.length - 3)) || 0;
    const secondParam =
      parseInt(instruction.charAt(instruction.length - 4)) || 0;

    const firstVal = firstParam === 1 ? input[i + 1] : input[input[i + 1]];
    const secondVal = secondParam === 1 ? input[i + 2] : input[input[i + 2]];

    let output = 0;

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
        if (firstVal > 0) {
          output = arg;
        }
        i += 1;
        break;
      case 5:
        if (firstVal !== 0) {
          i = secondVal - 1;
        } else {
          i += 2;
        }
        break;
      case 6:
        if (firstVal === 0) {
          i = secondVal - 1;
        } else {
          i += 2;
        }
        break;
      case 7:
        input[input[i + 3]] = firstVal < secondVal ? 1 : 0;
        i += 3;
        break;
      case 8:
        input[input[i + 3]] = firstVal === secondVal ? 1 : 0;
        i += 3;
        break;
      case 99:
        return output;
    }
  }
};

algorithm(1);
algorithm(5);
