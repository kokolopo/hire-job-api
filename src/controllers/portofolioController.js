const prisma = require("../db/prisma");
const jwt = require("jsonwebtoken");
const generateRandomString = require("../utils/randomString");
const { uploadFile, MinioClient } = require("../utils/objectStorage");

const portofolioController = {
  addPortofolio: async (req, res) => {
    const { app_name, repository, type } = req.body;

    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const image_url = generateRandomString(10);
      uploadFile(req.file.path, image_url);

      const presignedUrl = await MinioClient.presignedGetObject(
        "foodimages",
        image_url
      );

      const input = await prisma.portofolios.create({
        data: {
          worker: { connect: { id: user.payload.id } },
          app_name,
          repository,
          type,
          screen_shot: presignedUrl,
        },
      });
      res.status(201).json({ message: "sukses", input });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  workerPortofolios: async (req, res) => {
    const { worker_id } = req.params;
    try {
      const data = await prisma.portofolios.findMany({
        where: { worker_id: worker_id },
      });

      res
        .status(200)
        .json({ message: `data portofolios id_worker : ${worker_id}`, data });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong",
        error,
      });
    } finally {
      await prisma.$disconnect();
    }
  },
  ownPortofolios: async (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) {
      res.status(400).json({ msg: "g ada accessToken!" });
      return;
    }
    const user = jwt.decode(token, { complete: true });

    try {
      const data = await prisma.portofolios.findMany({
        where: { worker_id: parseInt(user.payload.id) },
      });

      res.status(200).json({ message: `data portofolios`, data });
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

module.exports = portofolioController;
