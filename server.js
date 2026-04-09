const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let notes = [];

const users = {
  "her": "1234",
  "him": "5678"
};

// LOGIN
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (users[username] === password) {
    return res.redirect(username === "her" ? "/her.html" : "/him.html");
  } else {
    res.send("Wrong password");
  }
});

// SAVE NOTE
app.post("/save", (req, res) => {
  notes.push({
    user: req.body.user,
    content: req.body.content,
    date: new Date().toISOString()
  });
  res.redirect("back");
});

// GET NOTES + LOCK
app.get("/notes", (req, res) => {
  const now = new Date();
  const lockDate = new Date("2026-04-09T00:00:00");
  const revealDate = new Date("2026-06-09T00:00:00");

  if (now > lockDate && now < revealDate) {
    return res.json({ locked: true, notes });
  }

  res.json({ locked: false, notes });
});

// MAIN PAGE CONTROL
app.get("/", (req, res) => {
  const now = new Date();
  const revealDate = new Date("2026-06-09T00:00:00");

  if (now >= revealDate) {
    res.sendFile(__dirname + "/public/reveal.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Running on port " + PORT));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});