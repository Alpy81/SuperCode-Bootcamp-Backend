import exress from "express";

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (req, res, next) => {
  res.send("Hallo Welt");
});

app.get("/cars", (req, res) => {
  res.send("In cars");
});

app.post("/cars", (req, res) => {
  res.send("Danke für das neue Auto");
});

app.use((req, res) => {
  res.send("Keine mag dich haben");
});

