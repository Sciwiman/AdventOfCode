const fs = require("fs");

var count = {
  two: 0,
  three: 0
};

String.prototype.hasExactly = function(number) {
  var sorted = this.split("").sort();
  var distinctValue = Array.from(new Set(sorted));
  for (let i = 0; i < distinctValue.length; i++) {
    if (
      sorted.lastIndexOf(distinctValue[i]) -
        sorted.indexOf(distinctValue[i]) ===
      number - 1
    ) {
      return true;
    }
  }
  return false;
};

fs.readFileSync("input.txt", "utf8")
  .split("\r\n")
  .forEach(val => {
    if (val.hasExactly(2)) {
      count.two++;
    }

    if (val.hasExactly(3)) {
      count.three++;
    }
  });

console.log(count.two * count.three);
