const createError = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const moment = require("moment");

const prisma = new PrismaClient();

class TodoRepositorySingleton {
  createTodo = async (req, res, next, createTodoDto) => {
    console.log(createTodoDto, "createTodoDto");
    try {
      const todo = await prisma.todo.createMany({
        data: {
          title: createTodoDto.title,
          completed: createTodoDto.completed,
          userId: createTodoDto.userId,
        },
      });
      return todo;
    } catch (error) {
      console.log(error);
    }
  };

  getAllTodos = async (
    req,
    res,
    next,
    { currentPage, todosPerPage, query }
  ) => {
    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId: query,
        },
        skip: currentPage,
        take: todosPerPage * currentPage,
      });
      return todos;
    } catch (e) {
      console.log(e);
    }
  };

  updateTodo = async (req, res, next, data) => {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
      },
    });
    return updatedTodo;
  };

  deleteTodo = async (req, res, next, data) => {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: data,
      },
    });
    return deletedTodo;
  };


///code below here could've been done with a single function and or in a better way, I ran out of time honestly.

  groupByMonth = async (req, res, next, data) => {
    const completedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("month").toDate(),
          gte: moment().startOf("month").toDate(),
        },
        completed: true,
      },
      _count: {
        completed: true,
      },
    });
    const incompletedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("month").toDate(),
          gte: moment().startOf("month").toDate(),
        },
        completed: false,
      },
      _count: {
        completed: true,
      },
    });
    console.log(completedTodos[0]._count, incompletedTodos[0]._count);
    const total = completedTodos[0]._count.completed + incompletedTodos[0]._count.completed;
    console.log(total)
    res.send({
      data: {
        completed: completedTodos[0]._count.completed,
        incomplete: incompletedTodos[0]._count.completed,
        total: total,
      },
    });
  };

  groupByWeek = async (req, res, next, date) => {
    const completedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("week").toDate(),
          gte: moment().startOf("week").toDate(),
        },
        completed: true,
      },
      _count: {
        completed: true,
      },
    });

    const incompletedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("week").toDate(),
          gte: moment().startOf("week").toDate(),
        },
        completed: false,
      },
      _count: {
        completed: true,
      },
    });

    const total = completedTodos[0]._count.completed + incompletedTodos[0]._count.completed;
    console.log(total)
    res.send({
      data: {
        completed: completedTodos[0]._count.completed,
        incomplete: incompletedTodos[0]._count.completed,
        total: total,
      },
    });
  };

  groupByDay = async (req, res, next, date) => {
    const completedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("day").toDate(),
          gte: moment().startOf("day").toDate(),
        },
        completed: true,
      },
      _count: {
        completed: true,
      },
    });

    const incompletedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment().endOf("day").toDate(),
          gte: moment().startOf("day").toDate(),
        },
        completed: false,
      },
      _count: {
        completed: true,
      },
    });

    const total = completedTodos[0]._count.completed + incompletedTodos[0]._count.completed;
    console.log(total)
    res.send({
      data: {
        completed: completedTodos[0]._count.completed,
        incomplete: incompletedTodos[0]._count.completed,
        total: total,
      },
    });
  };

  groupByDateRange = async (req, res, next, date) => {
    const completedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment(date).toDate(),
          gte: moment(date).toDate(),
        },
        completed: true,
      },
      _count: {
        completed: true,
      },
    });

    const incompletedTodos = await prisma.todo.groupBy({
      by: ["completed"],
      where: {
        createdAt: {
          lte: moment(date).toDate(),
          gte: moment(date).toDate(),
        },
        completed: false,
      },
      _count: {
        completed: true,
      },
    });

    const total = completedTodos[0]._count.completed + incompletedTodos[0]._count.completed;
    console.log(total)
    res.send({
      data: {
        completed: completedTodos[0]._count.completed,
        incomplete: incompletedTodos[0]._count.completed,
        total: total,
      },
    });
  };
}

module.exports = new TodoRepositorySingleton(prisma);
