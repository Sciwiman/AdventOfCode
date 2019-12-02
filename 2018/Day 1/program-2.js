const fs = require("fs");
const visited = {};

const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map(val => parseInt(val));

let duplicateLocation;
var currentPosition = 0;

let scanForDuplicationLocations = () => {
  for (let i = 0; i < input.length; i++) {
    const location = currentPosition + input[i];
    if (visited[location]) {
      duplicateLocation = location;
      break;
    }

    visited[location] = true;
    currentPosition = location;
  }
};

while (!duplicateLocation) {
  scanForDuplicationLocations();
}

console.log(`duplicateLocation:${duplicateLocation}`);
