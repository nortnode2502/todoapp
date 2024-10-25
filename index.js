const express = require("express");
const path = require("path");
const { getAllTasks } = require("./controller") 


const PORT = process.env.PORT || 3035;

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json())

app.get('/health', (req, res) => res.send({status: 'all good'}))
app.get('/api/task', async (req, res) =>  {
    const tasks =  await getAllTasks()
    res.send(tasks)
} )


app.listen(PORT, () => console.log(`Listening on ${PORT}`))