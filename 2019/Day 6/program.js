const fs = require("fs");
const _ = require("lodash");

const file = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map(val => {
    return {
      object: val.split(")")[0],
      orbitObject: val.split(")")[1]
    };
  });

let mappedData = input => {
  let map = [];
  for (let i = 0; i < input.length; i++) {
    let orbit = input[i];
    map[orbit.orbitObject] = orbit;
  }
  return map;
};

let pathToCom = (map, key) => {
  let element = map[key];
  let path = [];

  while (element) {
    path.push(element.object);
    element = map[element.object];
  }

  return path;
};

let totalOrbitNumber = input => {
  let map = mappedData(input);

  let orbitCount = 0;

  for (const [key] of Object.entries(map)) {
    orbitCount += pathToCom(map, key).length;
  }

  return orbitCount;
};

let numberOfOrbitTransfers = (input, from, to) => {
  let map = mappedData(input);
  return _.filter(
    _.groupBy(pathToCom(map, from).concat(pathToCom(map, to)), val => val),
    val => val.length === 1
  ).length;
};

console.log(`Part 1 - Total number of orbits: ${totalOrbitNumber(file)}`);
console.log(
  `Part 2 - Total number of orbit transfers between YOU and SAN: ${numberOfOrbitTransfers(
    file,
    "SAN",
    "YOU"
  )}`
);
