const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    user.token = token;

    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;

      return res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
