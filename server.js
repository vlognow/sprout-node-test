const path = require("path");
const express = require("express");
const Database = require("better-sqlite3");

const PORT = process.env.PORT || 8090;
const DB_PATH = process.env.DB_PATH || path.join(__dirname, "local.db");

const db = new Database(DB_PATH);
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (req, res) => res.json({ ok: true }));

app.post("/api/notes", (req, res) => {
  const text = (req.body && req.body.text) || "";
  if (!text.trim()) return res.status(400).json({ error: "text is required" });
  const info = db.prepare("INSERT INTO notes (text) VALUES (?)").run(text.trim());
  res.status(201).json({ id: info.lastInsertRowid });
});

app.get("/api/notes", (req, res) => {
  res.json(db.prepare("SELECT id, text, created_at FROM notes ORDER BY id DESC").all());
});

app.listen(PORT, () => {
  console.log(`sprout-node-test listening on ${PORT} (db: ${DB_PATH})`);
});
