const mongoose = require('mongoose');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userschema = Schema({
    email:{
        type:String,
        required:[true,'Please enter an email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please enter a valid email']
    },
    password:{
        type:String,
        required:[true,'Please enter a password'],
        unique:true,
        minlength:[6,'Minimum password length is 6 characters']
    },
    EmailVerified:{
        type:Boolean,
        default:false
    },
    Emailtoken:{
        type:String,
    },
    createdAt: { type: Date, default: Date.now }

});

userschema.index({ createdAt: 1 }, { expireAfterSeconds: 60, partialFilterExpression: { EmailVerified: false } })
userschema.pre('save',async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    next();
});
userschema.statics.login = async function(email,password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password,user.password);
        if(auth){
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}
userschema.statics.verifyemail = async function(emailtoken){
    let user = await this.findOne({Emailtoken:emailtoken});
    if(user){
        const response = await User.updateOne({Emailtoken:emailtoken},{$set:{EmailVerified:true}});
        if(response){
            // user= await this.findOne({Emailtoken:emailtoken});
            return user;
        }
    }else{
        throw Error('Something went wrong');
    }

}
const User = mongoose.model('user',userschema);
module.exports=User;
