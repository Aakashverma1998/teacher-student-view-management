const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config();
const port = process.env.port || 3000
const app = express()
//Connecting database here.
mongoose.connect(`mongodb://${process.env.HOST_NAME}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`).then(() => {
  console.log("db connected...");
  
}).catch((err) => {
  console.log(err);
})

app.use(express.json())
//mainRoute of student & Teacher Management.
require("./routes/mainRoutes")(app);

app.listen(port,console.log(`server is running on port ${port}`))