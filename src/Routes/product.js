const router = require("express").Router();
const { SignInRequired, adminMiddleware } = require('../Common.middleware/index')
const { ProductPost } = require("../Controller/product")
const multer = require('multer');
const fs = require('fs')
const storage = multer.diskStorage({
  distination: function (req, file, cb) {
    cb(null, 'uploades/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.filename + ".png")
  }
})
let upload = multer({ storage })

router.post('/product/post',
  SignInRequired,
  adminMiddleware,
  (req, res, next) => {
    upload(fs.readFileSync("uploades/" + req.file.filename));
    next();
  },
  ProductPost);


module.exports = router