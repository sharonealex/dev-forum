const express = require("express");
const router = express.Router();
const auth = require("../utils/auth");
const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route GET api/auth
//dont need token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("server error");
  }
});

//LOGIN no need token
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    //see if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "invalid credentials1" }] });
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "invalid credentials2" }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      config.get("JWT_SECRET"),
      {
        expiresIn: 360000,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

    //return json webtoken, so user is logged in right away without going through another link to log in.
  } catch (err) {
    console.error(err.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
