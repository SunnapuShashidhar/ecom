var userSchema = require("../../Module/userModule")
var jwt = require('jsonwebtoken')
var bcrypt = require('bcrypt');
// const { use } = require("../../Routes/userRouter");

//user signup
const adminSignUp = async (req, res) => {
  const { email } = req.body;

  const user = await userSchema.findOne({ email: email })

  if (user) {
    return res.send({ status: 400, message: "admin already exsist...!" })
  }
  const { name, password, contact, userName, profile, } = req.body;
  const hash_password = await bcrypt.hash(password, 10)
  const newUser = new userSchema({
    name,
    email,
    password: hash_password,
    role: "admin",
    contact,
    userName,
    profile
  });
  newUser.save((err, responce) => {
    console.log(responce)
    if (err) {
      res.send("error occured:" + err);
    }
    res.send(responce)
  })
}

//user signin
const adminSignIn = async (req, res) => {
  const { email, password, name } = req.body;
  const user = await userSchema.findOne({ email });
  if (!user) {
    return res.send("Admin not exisist..!");
  }
  if (bcrypt.compare(password, user.password) && user.role == "admin") {
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRCT_CODE, { expiresIn: "1d" })
    res.send({ status: 200, token, user })
  }
  else {
    return res.send({ status: 400, message: "Invalid Password...!" })
  }
}



module.exports = { adminSignIn, adminSignUp }