const jwt = require("jsonwebtoken");
// const prisma = require("../db/prisma");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null)
    return res.status(401).json({ message: "Unauthorization" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);

    next();
  });
};

const isWorker = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);

    if (decoded.role !== "worker") return res.sendStatus(403);
    next();
  });
};

const isRecruter = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
    if (err) return res.sendStatus(403);

    if (decoded.role !== "recruter") return res.sendStatus(403);
    next();
  });
};

module.exports = { verifyToken, isWorker, isRecruter };
