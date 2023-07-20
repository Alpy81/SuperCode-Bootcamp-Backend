import express from "express";
import cors from "cors";
import { addTodo, todos, updateTodo, deleteTodo } from "./model/TodosModel.js";

const app = express();

const PORT = 3001;

app.use(express.json());
app.use(cors());

// hier werden die Routen definiert und die Daten werden an den Client gesendet
app.get("/api/todos", (req, res) => {
  console.log(todos);
  res.send(todos);
});

// hier werden die Daten vom Client empfangen und in der Datenbank gespeichert
app.post("/api/todos", async (req, res) => {
  const todo = req.body;
  const newTodo = await addTodo(todo);
  res.send(newTodo);
});

// hier werden die Daten vom Client empfangen und in der Datenbank bearbeitet
app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  const updatedTodo = await updateTodo(id, todo);
  res.send(updatedTodo);
});

// hier werden die Daten vom Client empfangen und in der Datenbank gelöscht
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  deleteTodo(id);
  res.send("es wurde gelöscht");
});

app.listen(PORT, () => {
  console.log(`Server ist am laufen mit diesem Port${PORT}`);
});

console.log("Hello World");
