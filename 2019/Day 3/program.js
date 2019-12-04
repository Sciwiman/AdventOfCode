const _ = require("lodash");

const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map(val => val.split(","));

let plotCourse = inputArray => {
  let coOrds = [];
  let currentLocation = { x: 0, y: 0, stepsCount: 0 };

  inputArray.forEach(val => {
    let direction = val.substr(0, 1);
    let distance = val.substr(1, val.length - 1);

    Array.prototype.push.apply(
      coOrds,
      plotPath(currentLocation, direction, distance)
    );

    currentLocation = coOrds[coOrds.length - 1];
  });

  return coOrds;
};

let plotPath = (startingLocation, direction, distance) => {
  let stepsCount = startingLocation.stepsCount;
  let courseCoOrds = [];
  for (let i = 1; i <= distance; i++) {
    let nextLocation = {};
    if (direction === "R") {
      nextLocation = {
        x: startingLocation.x + i,
        y: startingLocation.y,
        stepsCount: ++stepsCount
      };
    } else if (direction === "D") {
      nextLocation = {
        x: startingLocation.x,
        y: startingLocation.y - i,
        stepsCount: ++stepsCount
      };
    } else if (direction === "L") {
      nextLocation = {
        x: startingLocation.x - i,
        y: startingLocation.y,
        stepsCount: ++stepsCount
      };
    } else if (direction === "U") {
      nextLocation = {
        x: startingLocation.x,
        y: startingLocation.y + i,
        stepsCount: ++stepsCount
      };
    } else {
      throw "Invalid direction";
    }
    courseCoOrds.push(nextLocation);
  }

  return courseCoOrds;
};

let getIntersections = (pathA, pathB) => {
  return _.intersectionWith(pathA, pathB, (val1, val2) => {
    if (val1.x == val2.x && val1.y == val2.y) {
      val1.stepsCount = val1.stepsCount + val2.stepsCount;
      return val1.x == val2.x && val1.y == val2.y;
    }
  });
};

const timer = new Date();

const wireACoOrds = plotCourse(input[0]);
const wireBCoOrds = plotCourse(input[1]);

const intersections = getIntersections(wireACoOrds, wireBCoOrds);

const part1 = () => {
  const minDistance = _.min(
    _.map(intersections, val => Math.abs(val.x) + Math.abs(val.y))
  );

  console.log(`Part 1 magical answer ${minDistance}.`);
};

const part2 = () => {
  const minSteps = _.min(_.map(intersections, val => val.stepsCount));

  console.log(`Part 2 magical answer ${minSteps}.`);
};

part1();
part2();

console.log(`Total time processing ${(new Date() - timer) / 1000}s`);
