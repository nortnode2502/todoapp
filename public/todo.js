console.log('front end js töötab!!!')

async function fetchTasks() {
    const response = await fetch('/api/task')

    if (response.status !== 200) {
        console.log('Ülesannete laadimine ebaõnnestus')
        return
    }

    const todos = await response.json()
    console.log(todos)
}

fetchTasks()