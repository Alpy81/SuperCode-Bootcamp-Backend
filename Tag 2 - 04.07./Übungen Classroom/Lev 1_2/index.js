const {
  getRandomNumberInRange,
  capitalizeFirstLetter,
  uppercaseString,
  checkLastLetter,
} = require("./functions");
const { names, numbers } = require("./data");

console.log(getRandomNumberInRange(1, 10));
console.log(capitalizeFirstLetter("hello"));
console.log(uppercaseString("hello world"));
console.log(checkLastLetter("Test", "t"));
console.log(checkLastLetter("Test", "q"));

console.log(names);
console.log(numbers);

// ..
// **
// ??
// ++
// :
// --
// #
// !
