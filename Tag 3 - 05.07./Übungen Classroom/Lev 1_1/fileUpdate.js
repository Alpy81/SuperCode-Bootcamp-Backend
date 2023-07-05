const fs = require("fs");

const filePath = "blog1.txt";
const newContent = "Ich bin ein Webdeveloper";

fs.writeFile(filePath, newContent, "utf8", (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Die Datei wurde erfolgreich aktualisiert.");
});
