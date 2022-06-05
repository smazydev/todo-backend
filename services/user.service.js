const UserRepository = require("../repositories/user.respository");

class UserServiceSingleton {
  userRepository;
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  createUser = (req,res,next,createUserDto) => {
    console.log(createUserDto,"create user service");
    return this.userRepository.createUser(req,res,next,createUserDto);
  }

  findUser = (req,res,next,query) => {
    return this.userRepository.findUser(req,res,next,query);
  }


}

module.exports = new UserServiceSingleton(UserRepository);
