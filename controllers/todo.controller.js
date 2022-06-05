const TodoService = require("../services/Todo.service");

class TodoControllerSingleton {
  //Inject the services in here first.

  TodoService;
  constructor(TodoService) {
    this.TodoService = TodoService;
  }

  createTodo = (req, res, next, data) => {
    return this.TodoService.createTodo(req, res, next, data);
  };
  updateTodo = (req, res, next, data) => {
    return this.TodoService.updateTodo(req, res, next, data);
  };
  getAllTodos = (req, res, next, data) => {
    return this.TodoService.getAllTodos(req, res, next, data);
  };
  deleteTodo = (req, res, next, data) => {
    return this.TodoService.deleteTodo(req, res, next, data);
  };
}

module.exports = new TodoControllerSingleton(TodoService);
