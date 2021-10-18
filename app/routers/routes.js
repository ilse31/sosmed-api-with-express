const Usercontroller = require("../controllers/userControllers");
const PostConotroller = require("../controllers/postControllers");
const KomController = require("../controllers/komenController");
const EmailController = require("../controllers/emailController");
const auth = require("../../middleware/auth");
const route = require("express").Router();

//! User
route.post("/login", Usercontroller.login); // login
route.post("/user", Usercontroller.create); //register
route.get("/user", Usercontroller.getAll);
route.get("/user/:id", Usercontroller.getById);
route.delete("/user/:id", Usercontroller.deleted);
route.put("/user/:id", Usercontroller.EditData);

//!komentar
route.post("/com", KomController.create);
route.get("/com", auth, KomController.getAll);

//!Post
route.post("/post", PostConotroller.create);
route.get("/post", PostConotroller.getAll);
route.get("/post/:id", PostConotroller.getById);

//!email
route.post("/email", EmailController.sendEmail); //kirim bentuk json

route.get("/auth", auth, async (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

module.exports = route;
