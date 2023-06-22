const minio = require("minio");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

const MinioClient = new minio.Client({
  endPoint: process.env.S3_ENDPOINT,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  port: 443,
  useSSL: true,
});

const uploadFile = (path, objectName, res) => {
  fs.readFile(path, function (err, data) {
    if (err) {
      return res.send(err);
    }
    const metaData = {
      "Content-Type": "image/png, image/jpg, image/jpeg", // sesuaikan dengan jenis file gambar
    };
    MinioClient.putObject(
      "foodimages",
      objectName,
      data,
      metaData,
      function (err, etag) {
        if (err) {
          return res.send(err);
        }
      }
    );
  });
};

const removeFile = (filename) => {
  MinioClient.removeObject("foodimages", filename, function (err) {
    if (err) {
      return err;
    }
  });
};

module.exports = { MinioClient, uploadFile, removeFile };
