import User from "../models/User.js";

export const searchUsers = async (req, res) => {
  try {
    const filter = req.query.filter?.trim();
    if (!filter) {
      return res.status(200).json({
        users: await User.find({
          _id: { $ne: req.userId },
        }).select("email username firstName lastName _id"),
      });
    }
    const users = await User.find({
      _id: { $ne: req.userId },
      username: { $regex: "^" + filter, $options: "i" }
    }).select("email username firstName lastName _id");
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
