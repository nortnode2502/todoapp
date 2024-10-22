const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3035;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

app.get('/health', (req, res) => res.send({status: 'all good'}))

app.listen(PORT, () => console.log(`Listening on ${PORT}`))