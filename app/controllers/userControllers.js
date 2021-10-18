const { User, Post, Komen } = require("../../models");
const generateToken = require("../../middleware/jwt");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!(name && password)) {
    res.status(400).send("All input is required");
  }
  try {
    const user = await User.findOne({ where: { name } });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = generateToken({ username: req.body.name });
        const userToken = [{ user, tokens: token }];
        return res.status(200).json(userToken);
      } else {
        res.json("wrong pass");
      }
    } else {
      return res.status(200).json("email valid");
    }
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const create = async (req, res) => {
  const { name, email, password } = req.body;
  const hashpass = await bcrypt.hash(password, 10);
  try {
    if (!(name && email && password)) {
      res.status(400).send("All input is required");
    }
    const oldUser = await User.findOne({ where: { email } });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const user = await User.create({
      name,
      password: hashpass,
      email: email,
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const deleted = async (req, res) => {
  //   const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });
    user.destroy();
    return res.json({ message: "User Deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somthing wrong" });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somthing wrong" });
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
      include: ["posts", "commentar"],
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somthing wrong" });
  }
};
const EditData = async (req, res) => {
  const { name, email, password } = req.body;
  const id = req.params.id;
  try {
    const user = await User.findOne({
      where: { id },
    });
    user.name = name;
    user.password = password;
    user.email = email;

    await user.save();
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somthing wrong" });
  }
};

module.exports = {
  login,
  create,
  deleted,
  getAll,
  getById,
  EditData,
};
