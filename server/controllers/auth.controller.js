const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!(email && password && username)) {
      return res.status(400).send("All input is required");
    }

    const oldUser = User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword,
    });

    const token = jwt.sign(
      { user_id: user.id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).send(`Something went wrong during registration: ${err.message}`);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    const user = User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user.id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token,
      });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = User.findAll();
    res.status(200).json(users.map(u => ({ _id: u.id, username: u.username, email: u.email })));
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};