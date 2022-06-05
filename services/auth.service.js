const express = require("express");
const createError = require("http-errors");
const UserService = require("./user.service");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

class AuthServiceSingleton {
  userServiceInstance;
  constructor(userService) {
    this.userServiceInstance = userService;
  }

  signupHandler = async (req, res, next, data) => {
    console.log("inside service signup handler");
    try {
      const user = await this.userServiceInstance.createUser(
        req,
        res,
        next,
        data
      );
      console.log(user);
      const obj = _.omit(user, ["password"]);
      //should have a centralized response system to send back response
      res.status(200).send({ message: "User Created Successfully", data: obj });
    } catch (error) {
      console.log(error);
    }
  };

  loginHandler = async (req, res, next, data) => {
    console.log("login handler auth service");
    console.log(data);
    const { password, email } = data;
    try {
      const user = await this.userServiceInstance.findUser(
        req,
        res,
        next,
        email
      );
      console.log(user);

      if (user === null) {
        return createError(401, "User not found");
      } else if (user.password !== password) {
        return createError(401, "Incorrect username or password");
      } else {
        const userId = { id: user.id };
        const access_token = jwt.sign(
          userId,
          process.env.JWT_ACCESS_TOKEN_SECRET
        );
        const resObj = { ...user, access_token };
        const omittedObj = _.omit(resObj, ["password", "id"]);
        return { message: "login successfull", data: omittedObj };
      }
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new AuthServiceSingleton(UserService);
