//modules from package.json
const router = require("express").Router();

//user defined modules
const { adminSignIn, adminSignUp } = require("../../Controller/admin/auth");
const { isValidate, SignUpValidation, SingnInValidation } = require("../../Validators/auth")


//routes
router.post("/admin/signup", SignUpValidation, isValidate, adminSignUp);
router.post("/admin/signin", SingnInValidation, isValidate, adminSignIn);
// router.post("/admin/profile", adminSignInRequired);



module.exports = router