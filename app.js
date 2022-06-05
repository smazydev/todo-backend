const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
const { authRouter } = require("./routes/auth.route");
const { todoRouter } = require("./routes/todo.route");
const cors = require("cors");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));

app.use("/api/v1", authRouter);
app.use("/api/v1", todoRouter);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 @ http://localhost:${PORT}`);
});
