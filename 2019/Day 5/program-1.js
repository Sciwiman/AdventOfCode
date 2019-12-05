// Just read in the file. Create an array and make sure all the values are integers

const fs = require("fs");
const input = fs
  .readFileSync("input.csv", "utf8")
  .split(",")
  .map(val => parseInt(val));

let updateArray = (array, index) => {
  if (array[index] == 1) {
    //Add the elements
    array[array[index + 3]] = array[array[index + 1]] + array[array[index + 2]];
  } else if (array[index] == 2) {
    //Multiply the elements
    array[array[index + 3]] = array[array[index + 1]] * array[array[index + 2]];
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
