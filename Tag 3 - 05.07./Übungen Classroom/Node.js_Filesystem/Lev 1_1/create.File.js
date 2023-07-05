const fs = require("fs");

const oldFilePath = "Hello.txt";
const newFilePath = "HelloWorld.txt";

fs.rename(oldFilePath, newFilePath, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    `Die Datei "${oldFilePath}" wurde erfolgreich in "${newFilePath}" umbenannt.`
  );
});
