const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const workerController = {
  register: async (req, res) => {
    const { name, email, phone, password, confPassword } = req.body;
    if (password !== confPassword)
      return res.status(400).json({ msg: "password invalid" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const result = await prisma.workers.create({
        data: {
          role: "worker",
          name,
          email,
          password: hashPassword,
          phone,
          photo:
            "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
          detail_worker: {
            create: {
              job_desc: "",
              description: "",
              domisili: "",
              temp_kerja: "",
            },
          },
        },
      });

      res.json({ message: "Registrasi Berhasil", data: result });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await prisma.workers.findUnique({
        where: {
          email: email,
        },
        include: {
          detail_worker: true,
          portofolio: true,
          experience: true,
          skill: true,
        },
      });
      if (!user) return res.status(400).json({ msg: "email tidak ditemukan!" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ msg: "password salah!" });

      const { id, name, role } = user;
      const accessToken = jwt.sign(
        { id, name, email, role },
        process.env.ACCESS_TOKEN,
        {
          expiresIn: "1d",
        }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res
        .status(200)
        .json({ message: "Berhasil Login", data: user, token: accessToken });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  editDetail: async (req, res) => {
    const { name, job_desc, domisili, temp_kerja, description } = req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const result = await prisma.detailWorkers.update({
        data: {
          job_desc,
          domisili,
          temp_kerja,
          description,
        },
        where: { worker_id: user.payload.id },
      });

      // NOTE
      await prisma.workers.update({
        data: { name },
        where: { id: user.payload.id },
      });

      res.status(200).json({ message: "Berhasil diperbaharui", result });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  listWorker: async (req, res) => {
    try {
      let { page = 1, limit = 3, sort = "desc", name = "" } = req.query;
      let skip = (page - 1) * limit;

      const data = await prisma.workers.findMany({
        orderBy: [{ id: sort }],
        take: parseInt(limit),
        skip: skip,
        include: { detail_worker: true },
        where: { name },
      });
      // total data
      const resultCount = await prisma.workers.count();
      // total page
      const totalPage = Math.ceil(resultCount / limit);

      res.status(200).json({
        message: "list workers",
        total_data: resultCount,
        total_page: totalPage,
        current_page: parseInt(page),
        data,
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  detailWorker: async (req, res) => {
    const { worker_id } = req.params;
    try {
      const data = await prisma.workers.findUnique({
        where: { id: parseInt(worker_id) },
        include: {
          detail_worker: true,
          portofolio: true,
          experience: true,
          skill: true,
        },
      });

      res.status(200).json({ message: `data worker id : ${worker_id}`, data });
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

module.exports = workerController;
