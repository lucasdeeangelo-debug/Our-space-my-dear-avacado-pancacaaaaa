const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let notes = {
  her: [],
  him: []
};

const revealDate = new Date("2026-06-09T00:00:00");

app.post("/save", (req, res) => {
  const { user, content } = req.body;
  const date = new Date().toLocaleString();

  if (!notes[user]) return res.sendStatus(400);

  notes[user].push({ content, date });
  res.sendStatus(200);
});

app.get("/notes/:user", (req, res) => {
  if (new Date() < revealDate) {
    return res.json({ locked: true });
  }
  res.json(notes[req.params.user] || []);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));