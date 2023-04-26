const router = require("express").Router();
const { SignInRequired, adminMiddleware } = require("../Common.middleware/index")
const { categoryPost, FetchCategories } = require("../Controller/categoryCon")

router.post("/category/create", SignInRequired, adminMiddleware, categoryPost)


router.get("/category/get", SignInRequired, FetchCategories)

module.exports = router;