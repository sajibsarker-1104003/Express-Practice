const express = require("express");
const { User } = require("../models/user");
const router = express.Router();
const bcrypt = require("bcrypt");

//Check user by email => send err msg =>save user

const newUser = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered");

  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);

  try {
    const result = await user.save();

    const token = user.generateJwt();
    res.send({
      token: token,
      data: {
        name: result.name,
        email: result.email,
      },
    });
  } catch (err) {
    const errMsg = [];
    for (field in err.errors) {
      errMsg.push(err.errors[field].message);
    }
    return res.status(400).send(errMsg);
  }
};
router.route("/").post(newUser);

module.exports = router;
