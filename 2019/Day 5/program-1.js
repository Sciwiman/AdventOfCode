// Just read in the file. Create an array and make sure all the values are integers

const fs = require("fs");
const input = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

let updateArray = (array, index) => {
  const instruction = array[index].toString();

  const opCode = parseInt(instruction.slice(-2));

  const modeFirstParam = parseInt(instruction.charAt(index.length - 3));
  const modeSecondParam = parseInt(instruction.charAt(instruction.length - 4));
  const modeThirdParam = parseInt(instruction.charAt(instruction.length - 5));

  console.log({
    opCode,
    modeFirstParam,
    modeSecondParam,
    modeThirdParam
  });

  const valOne =
    modeFirstParam === 0 ? array[array[index + 1]] : array[index + 1];

  const valTwo =
    modeSecondParam === 0 ? array[array[index + 2]] : array[index + 2];

  const positionResult = modeThirdParam === 0 ? array[index + 3] : index + 3;

  if (opCode == 1) {
    //Add the elements
    array[positionResult] = valOne + valTwo;
  } else if (opCode == 2) {
    //Multiply the elements
    array[positionResult] = array[positionOne] * array[positionTwo];
  } else if (opCode == 3) {
    //Multiply the elements
    array[positionResult] = array[positionOne] * array[positionTwo];
  } else if (opCode == 4) {
    //Multiply the elements
    array[positionResult] = array[positionOne] * array[positionTwo];
  } else {
    throw `Unknown Opcode ${opCode}`;
  }
};

//Loop through the entire csv array, 4 elements at a time
for (let i = 0; i < input.length; i += 4) {
  // If the op code is 99, exit
  if (input[i] === 99) {
    break;
  }

  updateArray(input, i);
}

// The magical answer
console.log(input[0]);
