const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const DATA_FILE = "notes.json";

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify({ her: [], him: [] }));
}

function getNotes(){
  return JSON.parse(fs.readFileSync(DATA_FILE));
}

function saveNotes(data){
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

const revealDate = new Date("2026-06-09T00:00:00");

app.post("/save", (req, res) => {
  const { user, content } = req.body;

  let data = getNotes();
  data[user].push({
    content,
    date: new Date().toLocaleString()
  });

  saveNotes(data);
  res.sendStatus(200);
});

app.get("/notes", (req, res) => {
  const locked = new Date() < revealDate;
  res.json({ locked, data: getNotes() });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));