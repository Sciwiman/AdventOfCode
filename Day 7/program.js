const perm = require("array-permutation");
const fs = require("fs");
const file = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

algorithm = (input, args) => {
  let output = 0;
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
        input[input[i + 1]] = args.shift();
        i += 1;
        break;
      case 4:
        output = firstVal;
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
  return 0;
};

let getAllPermutations = array => {
  var results = [];

  if (array.length === 1) {
    return array;
  }

  for (var i = 0; i < array.length; i++) {
    const firstElement = array[i];
    const left = array.slice(0, i);
    var innerPermutations = getAllPermutations(left);
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push(firstElement + innerPermutations[j]);
    }
  }

  return results;
};

let max = 0;

for (let permutation of perm([0, 1, 2, 3, 4])) {
  let inputSignal = 0;

  permutation.forEach(val => {
    let input = [...file];
    inputSignal = algorithm(input, [val, inputSignal]);
  });

  if (inputSignal > max) {
    max = inputSignal;
  }
}

console.log(max);
