const userrepo = require("../repositories/userrepo");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signup = async (req, res) => {
  try {
    const body = req.body;
    body.createdat = new Date();
    body.updatedat = new Date();
    body.active = true;
    body.role = 'user';
    body.password = await bcrypt.hash(body.password, 2); // encrypting the password
    await userrepo.create(body);
    res.status(201).json({ message: "user created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ message: "account already exists" });
    }
    else if(err.message.indexOf('ValidatorError' >-1)){
      res.status(400).json(err.errors);
    }
    else {
      res.status(500).json({ message: "internal server error" });
    }
  }
};
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbuser = await userrepo.getuserbyemail(email); // yaha pe poore details aajate user k name email password etc
    if (!dbuser) {
      res.status(401).json({ message: "email not identified" });
      return;
    }
    const isvalid = await bcrypt.compare(password, dbuser.password); // ab user jo password enter kara uss ku dbuser upper jo details mile the apne ku uss mein password b tha toh usse ich compare karre
    if (isvalid) {
      const token = jwt.sign({ email: dbuser.email, role: dbuser.role }, config.jwtsecret, { expiresIn: '1h' } ); // here we are creating token
      res.status(200).json({token: token});
    } else {
      res.status(401).json({ message: "password not identified" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};
module.exports = { signup, signin };
