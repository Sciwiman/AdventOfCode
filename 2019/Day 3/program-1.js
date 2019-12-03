// Just read in the file. Create an array and make sure all the values are integers

const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map(val => val.split(","));

const timer = new Date();

const wireACoOrds = input[0];
const wireBCoOrds = input[1];

let currentCoOrds = { x: 0, y: 0 };
let wireLocations = [{ x: 0, y: 0 }];

let plotCourse = (direction, distance, wireId) => {
  for (let i = 1; i <= distance; i++) {
    let nextLocation = {};

    if (direction === "R") {
      nextLocation = {
        x: currentCoOrds.x + i,
        y: currentCoOrds.y,
        wireId: wireId
      };
    } else if (direction === "D") {
      nextLocation = {
        x: currentCoOrds.x,
        y: currentCoOrds.y - i,
        wireId: wireId
      };
    } else if (direction === "L") {
      nextLocation = {
        x: currentCoOrds.x - i,
        y: currentCoOrds.y,
        wireId: wireId
      };
    } else if (direction === "U") {
      nextLocation = {
        x: currentCoOrds.x,
        y: currentCoOrds.y + i,
        wireId: wireId
      };
    } else {
      throw "Invalid direction";
    }

    const matchIndex = wireLocations.findIndex(
      loc =>
        loc.x === nextLocation.x &&
        loc.y === nextLocation.y &&
        loc.wireId !== nextLocation.wireId
    );

    if (matchIndex < 0) {
      wireLocations.push(nextLocation);
    } else {
      wireLocations[matchIndex].crossed = true;
    }
  }

  currentCoOrds = wireLocations[wireLocations.length - 1];
};

currentCoOrds = { x: 0, y: 0 };

wireACoOrds.forEach(val => {
  let direction = val.substr(0, 1);
  let distance = val.substr(1, val.length - 1);

  plotCourse(direction, distance, "A");
});

currentCoOrds = { x: 0, y: 0 };

wireBCoOrds.forEach(val => {
  let direction = val.substr(0, 1);
  let distance = val.substr(1, val.length - 1);

  plotCourse(direction, distance, "B");
});

const shortestDistance = wireLocations
  .filter(val => val.crossed)
  .map(val => Math.abs(val.x) + Math.abs(val.y))
  .sort()[0];

console.log(
  `Magical answer ${shortestDistance}. Total time processing ${(new Date() -
    timer) /
    1000}s`
);
