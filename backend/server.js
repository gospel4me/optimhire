const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const http = require("http");
// const dotenv = require("dotenv");
const app = express()
const mongoose = require('mongoose')
app.use(bodyParser.json({limit: "30mb", extended:true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}))
let apiRoutes = require("./routes/api-routes");
app.use(cors());

app.use('/api', apiRoutes);

const CONNECTION_URL= "mongodb://localhost:27017/"
const PORT = process.nextTick.PORT || 5000

mongoose.connect(CONNECTION_URL ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>app.listen(PORT, ()=>console.log(`server is running on port: ${PORT}`)))
.catch((error) => {
    console.log(error.message)
})
