const categorySchema = require("../Module/categories");
const slugify = require("slugify")

//creating category in backend 
categoryPost = (req, res) => {
  console.log(req.body)
  const cate = new categorySchema({
    name: req.body.name,
    slug: slugify(req.body.name),
    parentId: req.body.parentId
  })
  cate.save((err, responce) => {
    if (err) {
      res.send(err)
    }
    else {
      res.send(responce)
    }
  })
}
//organizing the category in an order
createCategories = (categories, parentId = null) => {
  let category;
  const categoryList = [];
  if (parentId == null) {
    category = categories.filter(cate => cate.parentId == undefined)//which are undefined 
  }
  else {
    category = categories.filter(cate => cate.parentId == parentId)//if parentId mateches filter thouse things
  }
  for (let cate of category) {
    categoryList.push({
      _id: cate._id,
      name: cate.name,
      slug: cate.slug,
      children: createCategories(categories, cate._id)
    })
  }
  return categoryList;
}
//fetching the new category
FetchCategories = (req, res) => {

  categorySchema.find({}, (err, responce) => {
    if (err) {
      res.send({ status: 400, message: "something wend wrong" + err })
    }
    else {
      const categoryList = createCategories(responce);
      res.send({ categoryList })
    }
  });


}




module.exports = { FetchCategories, categoryPost }