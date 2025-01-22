const mongoose = require("mongoose")
require("dotenv").config()
mongoose.connect(`${process.env.MONGO_URI}`,{
    useUnifiedTopology:true,
})
.then((db)=>{
    console.log(`database connected to ${db.connection.host}`)
})
.catch((e)=>{
    console.log(`${e}`)
})