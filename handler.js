const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const uuidv4 = require('uuid/v4');

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
      response.status(200).send({
        tasks: data
      });
    }
  });
});

app.post("/tasks", function (request, response) {
  const taskId = request.params.taskId;
  const task = {
    taskId: uuidv4(),
    userId: request.body.userId,
    text: request.body.text,
    completed: request.body.completed
  }
  connection.query("INSERT INTO task SET ? ", task, function (err, results) {
    if (err) {
      console.log("Error inserting task", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Created task with id " + taskId);
      response.status(201).send({
        tasks: data
      });
    }
  });
});




app.delete("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  //response.status(200).send("Deleted task with id " + taskId);
  connection.query("DELETE FROM task WHERE taskId = ? ", [taskId], function (err, data) {
    if (err) {
      console.log("Error deleting task with id ", err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log("Deleted task with id " + taskId)
      response.status(200).send({
        tasks: data
      });
    }
  });
});

app.put("/tasks/:taskId", function (request, response) {
  const taskId = request.params.taskId;
  const updatedTask = request.body.text;
  connection.query("UPDATE task SET completed = ?, WHERE taskId = ?", ['true', taskId], function (err, data) {
    if (err) {
      console.log("Error updating task with id " + taskId, err);
      response.status(500).json({
        error: err
      });
    } else {
      console.log(results.insertId)
      response.status(200).send({
        tasks: data
      })
    }
  });


  // const taskId = request.params.taskId;
  // const updatedTask = request.body;
  // response.status(200).send("Updated task with id " + taskId);
});


module.exports.tasks = serverlessHttp(app);