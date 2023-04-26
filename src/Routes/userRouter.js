//modules from package.jspon
var express = require("express");
var router = express.Router();

//user defined packages
var { SignIn, SignUp } = require("../Controller/auth")//import user defined routes
const { isValidate, SignUpValidation, SingnInValidation } = require("../Validators/auth")


//routes
router.post('/signin', SingnInValidation, isValidate, SignIn);
router.post("/signup", SignUpValidation, isValidate, SignUp);



//exporting
module.exports = router;