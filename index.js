const express = require("express");
const router = require("./src/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const dotEnv = require("dotenv");
const cookieParser = require("cookie-parser");
dotEnv.config();

const port = 5000;

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(router);

app.listen(port, () => console.log(`run and serve on port : ${port}`));
