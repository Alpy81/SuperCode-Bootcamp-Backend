import http from "http";
import fs from "fs";

function sendFile(path, res) {
  fs.readFile(path, "utf8", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end();
      return;
    }
    res.write(data);
    res.end();
  });
}

function simpleRequestHandlerPlus(req, res) {
  console.log("Meine Methode:", req.method);
  if (req.url === "/") {
    sendFile("./index.html", res);
  } else if (req.url === "/about") {
    sendFile("./about.html", res);
  } else if (req.url === "/contact") {
    sendFile("./contact.html", res);
  } else if (req.url === "/faq") {
    sendFile("./faq.html", res);
  } else {
    res.writeHead(404);
    res.end("Nichts da");
  }
}

const server = http.createServer(simpleRequestHandlerPlus);

server.listen(3000, () => console.log("Der Server läuft auf Port 3000"));
