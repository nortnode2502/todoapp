const express = require("express");
require('dotenv').config();
const path = require("path");
const { getAllTasks,  addTask } = require("./controller") 

const PORT = process.env.PORT || 3035;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get('/health', (req, res) => res.send({status: 'all good'}))
app.get('/api/task', async (req, res) =>  {
    const tasks =  await getAllTasks()
    res.send(tasks)
} )

app.post('/api/task', async (req, res)  => {
    await addTask(req.body.nimetus, req.body.priorieet)
    res.status(201).end()
})

app.get('/', (req, res) => {
    res.render('esileht')
})

app.get('/api/task/:taskId', (req,res) => {
    //võtab parameetri taskId ning küsib selle abil kontrollerist ühe taski andmed
})

app.listen(PORT, () => console.log(`Listening on ${process.env.PORT}`))