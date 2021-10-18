const express = require("express");
const { sequelize } = require("./models");
const userRouter = require("./app/routers/routes");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use("/api", userRouter);

app.listen({ port: 5000 }, async () => {
  console.log(`server run on http://localhost:5000`);
  await sequelize.authenticate();
  console.log("DB Connected ");
});
