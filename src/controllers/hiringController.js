const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");

const hiringController = {
  hiring: async (req, res) => {
    const { worker_id } = req.params;
    const { recruter_name, hiring_type, email, phone, description } = req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const data = await prisma.hirings.create({
        data: {
          hiring_type,
          recruter_name,
          email,
          phone,
          description,
          worker_id: parseInt(worker_id),
          recruter_id: user.payload.id,
        },
      });

      res.status(201).json({ message: "berhasil hiring!", data });
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

module.exports = hiringController;
