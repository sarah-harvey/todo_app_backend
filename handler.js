const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "todo_today"
});

app.get("/tasks", function (request, response) {
  connection.query("SELECT * FROM task", function (err, data) {
    if (err) {
      console.log("Error fetching tasks", err);
      response.status(500).json({
        error: err
      });
    } else {
      response.json({
        tasks: data
      });
    }
  });
});

app.post("/tasks", function (request, response) {
  connection.query('INSERT INTO task SET ?', [textValue, completedValue], function (err, results, fields) {
    if (err) {
      console.log("Error inserting task", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log(query + taskId);
      response.json({
        tasks: data + taskId
      });
    }
  });
});

//const task = request.body;
  // { text: "do the dishes", completed: true, date: "2019" }


app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  response.status(200).send("Deleted task with id " + taskId);
});

app.put("/tasks/:taskId", function (request, response) {
  connection.query('UPDATE task SET completed = true  WHERE taskId = ?', [taskId], function (error, results, fields) {
    if (error) throw error;
    // ...
  });


  // const taskId = request.params.taskId;
  // const updatedTask = request.body;
  // response.status(200).send("Updated task with id " + taskId);
  //});


  module.exports.tasks = serverlessHttp(app);