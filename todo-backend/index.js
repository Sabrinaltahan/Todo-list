const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

let todos = [
  {
    id: 1,
    title: "Learn React",
    description: "useState + useEffect",
    status: "not_started",
    deadline: "2026-03-20",
  },
];

const validStatuses = ["not_started", "in_progress", "done"];

function isValidDate(value) {
  if (!value) return true;
  return !isNaN(Date.parse(value));
}

app.get("/", (req, res) => {
  res.json({ ok: true });
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.post("/todos", (req, res) => {
  const { title, description, status, deadline } = req.body;

  if (!title || String(title).trim().length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters" });
  }

  if (description && String(description).length > 200) {
    return res.status(400).json({ message: "Description max 200 characters" });
  }

  const s = status ?? "not_started";
  if (!validStatuses.includes(s)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (!isValidDate(deadline)) {
    return res.status(400).json({ message: "Invalid deadline date" });
  }

  const newTodo = {
    id: todos.length ? Math.max(...todos.map((t) => t.id)) + 1 : 1,
    title: String(title).trim(),
    description: description ? String(description) : "",
    status: s,
    deadline: deadline ? String(deadline) : "",
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex((t) => t.id === id);

  if (idx === -1) {
    return res.status(404).json({ message: "Not found" });
  }

  const { title, description, status, deadline } = req.body;

  if (title !== undefined && String(title).trim().length < 3) {
    return res.status(400).json({ message: "Title must be at least 3 characters" });
  }

  if (description !== undefined && String(description).length > 200) {
    return res.status(400).json({ message: "Description max 200 characters" });
  }

  if (status !== undefined && !validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  if (deadline !== undefined && !isValidDate(deadline)) {
    return res.status(400).json({ message: "Invalid deadline date" });
  }

  const updated = {
    ...todos[idx],
    title: title === undefined ? todos[idx].title : String(title).trim(),
    description: description === undefined ? todos[idx].description : String(description),
    status: status === undefined ? todos[idx].status : status,
    deadline: deadline === undefined ? todos[idx].deadline : String(deadline),
  };

  todos[idx] = updated;
  res.json(updated);
});

app.delete("/todos/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = todos.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ message: "Not found" });
  }

  todos = todos.filter((t) => t.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});