const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const crypto = require("crypto")
const JWT = require("jsonwebtoken")
require("dotenv").config()
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken: {
        type: String,
    },
    tokenExpiry:{
        type:Date
    }
},{timestamps:true})





userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }else{
        this.password = await bcrypt.hash(this.password, 10);
        return next();
    }
})


userSchema.methods = {
    jwtToken(){
        return JWT.sign({id:this._id, email:this.email},
            process.env.SECRET_KEY,
            {expiresIn:'24h'}
        )
    },


    async generateToken(){
        const token = crypto.randomBytes(32).toString('hex');
        this.resetToken = token;
        this.tokenExpiry = Date.now() + 15 * 60 * 1000;
        return token;
    }
}



const register = new mongoose.model("register", userSchema)
module.exports = register;