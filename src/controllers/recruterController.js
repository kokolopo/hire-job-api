const prisma = require("../db/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const recruterController = {
  register: async (req, res) => {
    const { name, email, company, position, phone, password, confPassword } =
      req.body;
    if (password !== confPassword)
      return res.status(400).json({ msg: "password invalid" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      const result = await prisma.recruters.create({
        data: {
          role: "recruter",
          name,
          email,
          password: hashPassword,
          phone,
          photo:
            "https://cdn.icon-icons.com/icons2/3446/PNG/512/account_profile_user_avatar_icon_219236.png",
          detail_recruter: {
            create: {
              company: company,
              city: "",
              division: position,
              description: "",
              linkedin: "",
              instagram: "",
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
      const user = await prisma.recruters.findUnique({
        where: {
          email: email,
        },
        include: {
          detail_recruter: true,
        },
      });
      if (!user)
        return res.status(400).json({ message: "email tidak ditemukan!" });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: "password salah!" });

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
};

module.exports = recruterController;
