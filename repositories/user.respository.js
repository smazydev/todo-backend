const createError = require("http-errors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

class UserRepositorySingleton {
  userRepository;

  createUser = async (req, res, next, createUserDto) => {
    try {
      const user = await prisma.user.create({
        data: createUserDto,
      });
      return user;
    } catch (error) {
      if (error.code === "P2002") {
        next(createError(400, "User with that email alrady exists!"));
      }
    }
  };

  findUser = async (req, res, next, query) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: query,
        },
      });
      return user;
    } catch (e) {
      console.log(e);
    }
  };
}

module.exports = new UserRepositorySingleton(prisma);
