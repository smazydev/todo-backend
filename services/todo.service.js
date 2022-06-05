const todoRepository = require("../repositories/todo.respository");

class TodoServiceSingleton {
  todoRepository;

  constructor(todoRepository) {
    this.todoRepository = todoRepository;
  }

  createTodo = async (res,req,next,data) => {
    const createdTodo = await this.todoRepository.createTodo(req,res,next,data);
    return createdTodo;
  };
  updateTodo = async (req,res,next,data) => {
    const updatedTodo = await this.todoRepository.updateTodo(req,res,next,data);
    return updatedTodo;
  };
  deleteTodo = async (req,res,next,data) => {
    const deletedTodo = await this.todoRepository.deleteTodo(req,res,next,data);
    return deletedTodo;
  };
  getAllTodos = async (req,res,next,data) => {
    const getAllTodos = await this.todoRepository.getAllTodos(req,res,next,data);
    return getAllTodos;
  };
}

module.exports = new TodoServiceSingleton(todoRepository);
