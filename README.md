# todo_app_backend

This is the back end API of a Todo Application, built throughout the Tech Returners<https://www.techreturners.com/your-journey-into-tech> Your Journey Into Tech course. It is consumed by a front end React application, available here:<https://sarah-harvey.github.io/todo_app_frontend>  and connects to an RDS Database.

The hosted version of the application is available here: https://sarah-harvey.github.io/todo_app_backend

##Technology Used

This project uses the following technology:

* Serverless Framework
* JavaScript (ES2015+)
* Express
* SQL
* Mysql library
* AWS Lambda and API Gateway
* AWS RDS
* ESLint

###__Endpoints__

The API exposes the following endpoints:

-----------------------------------------------------------------------------------------

__GET /tasks__

https://p5pa4ryptk.execute-api.eu-west-2.amazonaws.com/dev/tasks

Responds with JSON containing all tasks in the Database.

-----------------------------------------------------------------------------------------

__POST /tasks__

https://p5pa4ryptk.execute-api.eu-west-2.amazonaws.com/dev/tasks

Will create a new task when sent a JSON payload in the format:
```
{
  "text": "walk dog",
  "completed": false,
  "date": "2019-12-17"
}
```

-----------------------------------------------------------------------------------------

__DELETE /tasks/:taskId__

https://p5pa4ryptk.execute-api.eu-west-2.amazonaws.com/dev/tasks/{taskId}

Deletes the task of the given ID.

-----------------------------------------------------------------------------------------

__PUT /tasks/:taskId__

https://p5pa4ryptk.execute-api.eu-west-2.amazonaws.com/dev/tasks/{taskId}

Will update a task when sent a JSON payload in the format:
```
{
  "text": "walk dog",
  "completed": true,
  "date": "2019-12-17"
}
```
