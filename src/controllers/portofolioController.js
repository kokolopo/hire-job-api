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
  // workerPortofolios: async (req, res) => {
  //   const {second} = req.params
  //   try {

  //   } catch (error) {
  //     res.status(500).json({
  //       message: "Something went wrong",
  //       error,
  //     });
  //   } finally {
  //     await prisma.$disconnect();
  //   }
  // },
};

module.exports = portofolioController;
