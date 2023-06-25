const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");

const experienceController = {
  add: async (req, res) => {
    const { company_name, description, position, start_date, end_date } =
      req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const response = await prisma.experiences.create({
        data: {
          worker: { connect: { id: parseInt(user.payload.id) } },
          company_name,
          description,
          position,
          start_date: new Date(start_date).toISOString(),
          end_date: new Date(end_date).toISOString(),
        },
      });

      res
        .status(201)
        .json({ message: "berhasil menambhakan pengalaman", response });
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

module.exports = experienceController;
