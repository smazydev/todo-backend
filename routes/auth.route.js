const { Router } = require("express");
const AuthController = require("../controllers/auth.controller");
const router = Router();

//Get routes

router.post("/auth/signup", async (req, res, next) => {
  const resp = await AuthController.signupHandler(req, res, next, req.body);
  res.send(resp);
});

router.post("/auth/login", async (req, res, next) => {
  console.log(req.body);
  const resp = await AuthController.loginHandler(req, res, next, req.body);
  res.send(resp);
});

module.exports = {
  authRouter: router,
};
