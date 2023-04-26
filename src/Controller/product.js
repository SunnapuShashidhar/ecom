const ProductSchema = require('../Module/product');
const shortId = require('shortid');//its is similar to the uuid
const slugify = require("slugify")
exports.ProductPost = (req, res) => {
  const { name, price, description, offers, reviews, category, createdBy, updatedAt, quentity } = req.body;
  const pictures = [];
  if (req.files.length > 0) {
    pictures = req.files.map(file => {
      return {
        img: file.location
      }
    })
  }
  const newProductSchema = new ProductSchema({
    name,
    slug: slugify(name),
    price,
    pictures,
    description,
    offers,
    reviews,
    category,
    createdBy,
    updatedAt,
    quentity
  })
  newProductSchema.save((error, responce) => {
    if (error) {
      res.send(error);
    }
    else {
      res.send(responce);
    }
  })

}



