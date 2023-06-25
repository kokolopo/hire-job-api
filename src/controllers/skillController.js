const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");

const skillController = {
  add: async (req, res) => {
    const { name } = req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const response = await prisma.skills.create({
        data: { name, worker: { connect: { id: user.payload.id } } },
      });

      res
        .status(201)
        .json({ message: "berhasil menambahkan skill!", response });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  ownSkills: async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const data = await prisma.skills.findMany({
        where: { worker_id: parseInt(user.payload.id) },
      });

      res.status(200).json({ message: `data skills`, data });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  workerSkills: async (req, res) => {
    const { worker_id } = req.body;
    try {
      const data = await prisma.skills.findMany({
        where: { worker_id: worker_id },
      });

      res.status(200).json({ message: `data skills`, data });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
};

module.exports = skillController;
