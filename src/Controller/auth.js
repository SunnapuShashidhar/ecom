//node package folders
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
//module
var userSchema = require("../Module/userModule")

//user signup
const SignUp = async (req, res) => {
  const { email } = req.body;

  const user = await userSchema.findOne({ email: email })

  if (user) {
    return res.send({ status: 400, message: "user already exsist...!" })
  }
  const { name, password, role, contact, userName, profile, } = req.body;
  const hash_password = await bcrypt.hash(password, 10)
  const newUser = new userSchema({
    name,
    email,
    password: hash_password,
    role,
    contact,
    userName,
    profile
  });
  newUser.save((err, responce) => {
    console.log(responce)
    if (err) {
      return res.send("error occured:" + err);
    }
    res.send(responce)
  })
}

//user signin
const SignIn = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.send("Invalid exisist..!");
  }
  const pswrd = await bcrypt.compare(password, user.password);

  if (pswrd) {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRCT_CODE, { expiresIn: "1d" })
    res.send({ status: 200, token, user })
  }
  else {
    return res.send({ status: 400, message: "Invalid Password...!" })
  }
}

module.exports = { SignIn, SignUp }