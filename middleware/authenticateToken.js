const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("inside authenticate token");
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .send({ message: "No Authorization token specified", data: {} });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "JWT Token Invalid" });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;
