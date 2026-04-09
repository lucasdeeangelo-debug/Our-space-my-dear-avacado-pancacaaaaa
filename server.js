const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let notes = {
  her: [],
  him: []
};

 const reveal = new Date("2026-06-09T00:00:00");

let pulse = false;

setInterval(()=>{
let diff = reveal - new Date();

if(diff <= 0){
document.getElementById("timer").innerText = "🖤 it's open.";
return;
}

let d = Math.floor(diff/(1000*60*60*24));
let h = Math.floor((diff/(1000*60*60))%24);
let m = Math.floor((diff/(1000*60))%60);
let s = Math.floor((diff/1000)%60);

let el = document.getElementById("timer");

el.innerText = `⏳ ${d}d ${h}h ${m}m ${s}s`;

pulse = !pulse;
el.style.opacity = pulse ? "1" : "0.6";
el.style.color = pulse ? "#ff4d6d" : "white";

},1000);

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