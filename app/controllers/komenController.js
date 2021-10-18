const { Komen, User } = require("../../models");

const create = async (req, res) => {
  const { title, body, userId } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    const komens = await Komen.create({
      title,
      body,
      userId: user.id,
    });
    return res.json(komens);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const getAll = async (req, res) => {
  try {
    const komens = await Komen.findAll({
      include: "user",
    });
    return res.json(komens);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  create,
  getAll,
};
