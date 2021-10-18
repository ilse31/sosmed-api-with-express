const { Post, User } = require("../../models");

const create = async (req, res) => {
  const { userId, body } = req.body;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const post = await Post.create({
      body,
      userId: user.id,
    });
    return res.json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: "user",
    });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Post.findOne({
      where: { id },
    });
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "somthing wrong" });
  }
};

module.exports = {
  create,
  getAll,
  getById,
};
