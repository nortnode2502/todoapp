const { MongoClient } = require("mongodb")

const andmebaas = "todos"
const salasona = process.env.MONGODB_PASSWORD
const app = process.env.MONGODB_APP
const connectionCluster = process.env.MONGODB_CLUSTER

const mongoUrl = `mongodb+srv://${app}:${salasona}@${connectionCluster}/?retryWrites=true&w=majority&appName=Cluster0`
const client = new MongoClient(mongoUrl);

const TODOS_COLLECTION = 'todo'

async function getCollectionFromNewConnection(collection) {
  await client.connect();
  const database = client.db(andmebaas);
  return database.collection(collection);
}

async function getAllTodos() {
  try {
    const todosCollection = await getCollectionFromNewConnection(TODOS_COLLECTION);
    todos = await todosCollection.find({}).toArray()
    return todos
  } finally {
    client.close();
  }
}

async function insertTodo({ description, priority, isDone }) {
  try {
    const todosCollection = await getCollectionFromNewConnection(TODOS_COLLECTION);
    return await todosCollection.insertOne({ description, priority, isDone });
  } finally {
    client.close();
  }
}

async function updateTodo(todoId, description, priority, isDone) {
  try {
    todosCollection = getCollectionFromNewConnection(TODOS_COLLECTION);
    const updateObject = {}
    if (description !== null) {
      updateObject.description = description
    }
    if (priority !== null) {
      updateObject.priority = priority
    }
    if (isDone !== null) {
      updateObject.isDone = isDone
    }

    return await todosCollection.updateOne({ _id: todoId }, { $set: updateObject });
  } finally {
    client.close();
  }
}

async function fetchOneTask(todoId) {
  try {
    todosCollection = getCollectionFromNewConnection(TODOS_COLLECTION);
    todos = await todosCollection.find({_id: todoId}).toArray()
    return todos
  } finally {
    client.close();
  }
}


module.exports = {
  getAllTodos,
  insertTodo,
  updateTodo,
  fetchOneTask
}
