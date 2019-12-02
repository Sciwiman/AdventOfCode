const input = require("./input");

const sum = (a, b) => a + b;

let getFuel = val => {
  return Math.floor(val / 3) - 2;
};

let getFuelTotal = mass => {
  let fuel = getFuel(mass);
  return fuel > 0 ? fuel + getFuelTotal(fuel) : 0;
};

console.log(`Part 1 fuel total: ${input.map(getFuel).reduce(sum)}`);
console.log(`Part 2 fuel total: ${input.map(getFuelTotal).reduce(sum)}`);
