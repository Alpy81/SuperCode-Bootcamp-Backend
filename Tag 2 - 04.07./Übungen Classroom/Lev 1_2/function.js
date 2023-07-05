// function getFirstElement(arr) {
//   return arr[0];
// }

// function getAllExceptLast(arr) {
//   return arr.slice(0, -1);
// }

// function getLastElement(arr) {
//   return arr[arr.length - 1];
// }

// function getAllExceptFirst(arr) {
//   return arr.slice(1);
// }

// function removeElement(arr, element) {
//   return arr.filter((item) => item !== element);
// }

// function getUniqueValues(arr) {
//   return [...new Set(arr)];
// }

// function getArraySum(arr) {
//   return arr.reduce((sum, num) => sum + num, 0);
// }

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function uppercaseString(str) {
  return str.toUpperCase();
}

function checkLastLetter(str, letter) {
  return str.slice(-1).toLowerCase() === letter.toLowerCase();
}
