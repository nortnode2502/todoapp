const {getAllTodos, insertTodo} = require("../model")

async function getAllTasks() {
    const tasks = await getAllTodos();
    //kui vaja, siis siin võib teha andmeteisendusi

    return tasks

}

async function addTask(description, priority) {
    if (priority < 0 || priority > 1) { 
        console.log('Viga: priority võib olla ainult 0 või 1')
        return false
    }

    const uusTask = {
        description: description,
        priority: priority,
        isDone: 0
    }

    console.log(uusTask)

    await insertTodo(uusTask)

    return true
}

async function getOneTask(taskId) {
    //loeb medelist andmebaasikirje ning tagastab andmed
}

module.exports = {
    getAllTasks,
    addTask
}