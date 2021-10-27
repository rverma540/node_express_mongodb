const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already present "],
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  phone: {
    type: Number,
    required: true
  },
  work:{
    type:String,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  tokens:[
    {
      token:{type: String,
        required: true,
  
      }
    }
    
  ]
});


//Hasing Password 
userSchema.pre('save', async function(next){
  if(this.isModified('password')){
    this.password =await bcrypt.hash(this.password,12);
  }
  next();
})

 
//generate web token
userSchema.methods.generateAuthToken = async function(){
  try{
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY );
    this.tokens= this.tokens.concat({token:token});
    await this.save();
    return token;
  }catch(err){
    console.log(err);

  }
}

const User= new mongoose.model("USER", userSchema);
module.exports = User;

