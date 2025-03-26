console.log('front end js töötab!!!')

async function fetchTasks() {
    console.log('fetching ...')
    const response = await fetch('/api/task')

    if (response.status !== 200) {
        console.log('Ülesannete laadimine ebaõnnestus')
        return
    }

    const todos = await response.json()
    console.log(todos)
    showAllTasks(todos)
}


function showAllTasks(todos) {
    //TODO - näita kõiki loetud taskisid
    const ylesandedEL = document.getElementById('ylesanded')
    console.log(ylesandedEL)
    const headerHTML = getTasksHeader()
    const rowsHTML = getTasksHTML(todos)
    ylesandedEL.innerHTML = `
    ${headerHTML}
    ${rowsHTML}
    `
}

function getTasksHeader() {
    return `
    <div class="tasks_header">
        <div class="col_description" >Ülesanne</div>
        <div class="col_priority">Tähtsus</div>
    </div>
    `
}

function getTasksHTML(tasks) {
    let rowsHTML = ''
    for (const task of tasks) {
        rowsHTML += getOneTaskHTML(task)
    }
    return rowsHTML
}

function getOneTaskHTML(task) {
    return `
    <div class="tasks_row">
        <div class="col_description" >${task.nimetus}</div>
        <div class="col_priority">${task.prioriteet}</div>
    </div>
    `
}

async function addTask() {
    const taskDescription = document.getElementById('task_description').value
    const taskPriority = document.getElementById('task_priority').value

    const newTask = {
        nimetus: taskDescription,
        priorieet: taskPriority
    }

    let response = await fetch('/api/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
    })
    if (response.status === 201) {
        fetchTasks()
    } else {
        console.log('Ülesande lisamine ebaõnnestus')
    }
    
}

fetchTasks()