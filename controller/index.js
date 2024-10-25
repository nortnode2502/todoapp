const {getAllTodos} = require("../model")

async function getAllTasks() {
    const tasks = await getAllTodos();
    //kui vaja, siis siin võib teha andmeteisendusi

    return tasks

}

module.exports = {
    getAllTasks
}