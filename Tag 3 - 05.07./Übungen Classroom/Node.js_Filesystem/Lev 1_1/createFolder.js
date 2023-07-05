const fs = require("fs");

const folderPath = "assets";

fs.mkdir(folderPath, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Der Ordner "assets" wurde erfolgreich erstellt.');
});
