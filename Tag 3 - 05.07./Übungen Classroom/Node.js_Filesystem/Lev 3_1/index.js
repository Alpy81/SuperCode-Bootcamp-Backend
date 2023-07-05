const fs = require("fs");

function createOrAppendFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    console.log(`Die Datei "${filePath}" wurde erstellt.`);
  } else {
    fs.appendFileSync(filePath, `\n${content}`);
    console.log(
      `Der Inhalt "${content}" wurde zur Datei "${filePath}" hinzugefügt.`
    );
  }
}

const fileName = "meineDatei.txt";
const fileContent = "Neuer Inhalt";

// Aufruf der Funktion mit Dateiname und Inhalt
createOrAppendFile(fileName, fileContent);
