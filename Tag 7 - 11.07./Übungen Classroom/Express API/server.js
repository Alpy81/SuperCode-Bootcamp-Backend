import express from "express";
import fs from "fs/promises";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hallo, dies ist meine erste Express-API!");
});

app.use(express.json());

app.post("/post", async (req, res) => {
  try {
    const postData = req.body;

    // Überprüfe, ob der Post das richtige Format hat
    if (!isValidPost(postData)) {
      return res.status(400).send("Ungültiges Post-Format");
    }

    const data = await fs.readFile("posts.json", "utf8");
    const posts = JSON.parse(data);

    // Erstelle eine eindeutige ID für den Post
    const newPost = { id: generateUniqueId(), ...postData };

    posts.push(newPost);

    await fs.writeFile("posts.json", JSON.stringify(posts, null, 2));

    res.json(newPost);
  } catch (error) {
    console.error("Fehler beim Speichern des Posts:", error);
    res.status(500).send("Interner Serverfehler");
  }
});

// Funktion zum Überprüfen des Post-Formats
function isValidPost(postData) {
  return (
    typeof postData === "object" &&
    typeof postData.title === "string" &&
    typeof postData.body === "string"
    // Füge hier weitere Überprüfungen für andere Felder hinzu, falls erforderlich
  );
}

// Funktion zum Generieren einer eindeutigen ID
function generateUniqueId() {
  return Date.now().toString();
}

app.listen(PORT, () => {
  console.log(`Der Server läuft auf Port ${PORT}`);
});
