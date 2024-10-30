const  mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    database: 'defaultdb',
    password: process.env.MYSQL_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
   

 async function getAllTodos() {
 // For pool initialization, see above
 const conn = await pool.getConnection();
 
 
 // Do something with the connection
 try {
    const [results] = await conn.query(
      'SELECT * FROM `todos`'
    );
     console.log(results);
    return results;
 
 
  } catch (err) {
    console.log(err);
  }
 // Don't forget to release the connection when finished!
 pool.releaseConnection(conn);
  
 }

 async function insertTodo(task) {
  // For pool initialization, see above
  const conn = await pool.getConnection();
  
  
  // Do something with the connection
  try {
     const [results] = await conn.query(
       'insert into todos (description, priority, is_done) values (?, ?, ?);',
       [task.description, task.priority, task.isDone]
     );
      console.log(results);
     return results;
  
  
   } catch (err) {
     console.log(err);
   }
  // Don't forget to release the connection when finished!
  pool.releaseConnection(conn);
   
  }

  async function fetchOneTask(taskId) {
    //funktsioon tagastab andmebaasikirje
  }
 
 
 module.exports = {
    getAllTodos,
    insertTodo
 }
 