const {getAllTodos, insertTodo} = require("../model")

function _makeApiObjectFromData(dataObject) {
    return {
        id: dataObject._id,
        nimetus: dataObject.description,
        prioriteet: dataObject.priority,
        kasTehtud: dataObject.isDone,
    }
}

async function getAllTasks() {
    const tasks = await getAllTodos();
    return tasks.map( el => _makeApiObjectFromData(el))
}

async function addTask(nimetus, prioriteet) {
    if (prioriteet < 0 || prioriteet > 1) { 
        throw new Error('Viga: prioriteet võib olla ainult 0 või 1')
        return false
    }

    const uusTask = {
        description: nimetus,
        priority: prioriteet,
        isDone: 0
    }

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