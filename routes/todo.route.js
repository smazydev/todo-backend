const { Router } = require("express");
const TodoController = require("../controllers/todo.controller");
const authenticateToken = require("../middleware/authenticateToken");
const todoRepository = require("../repositories/todo.respository");
const router = Router();

//Get routes

router.get("/todos", authenticateToken, async (req, res, next) => {
  console.log("inside todos get");
  const userId = req.user.id;
  console.log(req.query);
  const resp = await TodoController.getAllTodos(req, res, next, {
    currentPage: parseInt(req.query.currentPage),
    todosPerPage: parseInt(req.query.todosPerPage),
    userId,
  });
  res.send(resp);
});

//create todo.
router.post("/todos", authenticateToken, async (req, res, next) => {
  console.log(req.body, req.user.id);
  const d = { ...req.body, userId: req.user.id };
  console.log(d);
  const resp = await TodoController.createTodo(req, res, next, d);
  res.send(resp);
});

//update todo.

router.put("/todos/:id", authenticateToken, async (req, res, next) => {
  console.log(req.params);
  const resp = await TodoController.updateTodo(req, res, next, {
    id: req.params.id,
    title: req.body.title,
  });
  res.send(resp);
});

//delete
router.post("/todos/:id", authenticateToken, async (req, res, next) => {
  console.log(req.params);
  const resp = await TodoController.deleteTodo(req, res, next, req.params.id);
  res.send(resp);
});

router.get("/todos/:groupby", async (req, res, next) => {
  console.log(req.params.groupby);
  const groupby = req.params.groupby;

  if (groupby === "month") {
    const re = await todoRepository.groupByMonth(req, res, next);
    res.send(re);
  } else if (groupby === "week") {
    const re = await todoRepository.groupByWeek(req, res, next);
    res.send(re);
  } else if (groupby === "day") {
    const re = await todoRepository.groupByDay(req, res, next);
    res.send(re);
  }
});

router.post("/todos/:groupby", async (req, res, next) => {
  const response = await this.todoRepository.groupByDateRange(
    res,
    req,
    next,
    req.body
  );
  res.send(response);
});

module.exports = {
  todoRouter: router,
};
