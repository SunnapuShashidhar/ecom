//impoerting node modules
require("dotenv").config();
var express = require("express")
var app = express();
var mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cors = require('cors')


//user defined routers
const userRouter = require("./Routes/userRouter")
const adminRouter = require("./Routes/Admin/Router")
const category = require("./Routes/category")
const product = require("./Routes/product")

//connexting mongodb with node
mongoose.set('strictQuery', false);//to avaid some warning it is used
mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useunifiedtopology: true
}).then(() => { console.log("mongodb is connected succesfully") }).catch((err) => { console.log("error occured" + err) })
//creating middle wire
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());//insted of this we can use the express.json()

app.use("/api", userRouter)
app.use("/api", adminRouter)
app.use("/api", category)
app.use("/api", product)

app.listen(process.env.PORT, () => {
  console.log(`port is running on the port${process.env.PORT}`)
})