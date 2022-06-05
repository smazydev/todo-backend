const AuthService = require("../services/auth.service");

class AuthControllerSingleton {
  //Inject the services in here first.

  authService;
  constructor(authService) {
    this.authService = authService;
  }

  signupHandler = async (req,res,next,data) => {
    console.log("inside signup handler");
    return await this.authService.signupHandler(req,res,next,data);
  }; 

  loginHandler = async (req,res,next,data) => {
      console.log("inside login handler auth controller");
      return await this.authService.loginHandler(req,res,next,data);
  };
}

module.exports = new AuthControllerSingleton(AuthService);
