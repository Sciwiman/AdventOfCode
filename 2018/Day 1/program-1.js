const fs = require("fs");

const data = fs
  .readFileSync("input.txt", "utf8")
  .split("\r\n")
  .map(val => parseInt(val))
  .reduce((acc, val) => {
    return (acc = acc + val);
  });

console.log(data);
