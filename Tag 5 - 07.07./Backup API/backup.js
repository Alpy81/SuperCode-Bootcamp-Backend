import fetch from "node-fetch";
import fs from "fs";
import path from "path";

const dataDir = "./data";
const filePath = path.join(dataDir, "posts.json");

// ! Überprüfen, ob das Verzeichnis existiert und es erstellen, falls nicht
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// ! Funktion zum Abrufen der Kommentare für einen Post
async function fetchCommentsForPost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
  );
  const comments = await response.json();
  return comments;
}

// ! Funktion zum Abrufen der Posts und der zugehörigen Kommentare
async function fetchPostsAndComments() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    for (const post of posts) {
      const comments = await fetchCommentsForPost(post.id);
      post.comments = comments;
    }

    return posts;
  } catch (error) {
    throw new Error("Fehler beim Abrufen der Daten: " + error);
  }
}

// ! Hauptfunktion zum Ausführen des Skripts
async function main() {
  try {
    const postsWithComments = await fetchPostsAndComments();

    const data = JSON.stringify(postsWithComments, null, 2);
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error("Fehler beim Schreiben der Datei posts.json:", err);
      } else {
        console.log("Daten erfolgreich in posts.json gespeichert.");
      }
    });
  } catch (error) {
    console.error("Fehler:", error);
  }
}

// ! Skript ausführen
main();
