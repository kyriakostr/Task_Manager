const path = require("path");
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const handleErrors = (err) =>{
    console.log(err.message,err.code);
    let error = {email:'',password:''};

    if(err.message==='incorrect email'){
        error.email = 'that email is not registered';
    }
    if(err.message==='incorrect password'){
        error.password='that password is incorrect';
    }

    if(err.code===11000){
        error.email = 'that email is already registered';
        return error;
    }

    if(err.message.includes('user validation failed')){
       Object.values(err.errors).forEach(({properties})=>{
        error[properties.path]=properties.message;
       }
       )
    }
    return error;
}
const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'secret',{
        expiresIn: maxAge
    });
};

const signup_get = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/SignupPage.html'));
};

const login_get = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/LoginPage.html'));
};
const signup_post = async (req,res)=>{
    const {email,password} = req.body;
    try{
        await User.syncIndexes();
        const user = await User.create({email,password,EmailVerified:false,Emailtoken:crypto.randomBytes(64).toString('hex')});
        
        // const token = createToken(user._id);
        // res.cookie('current_user',token,{httpOnly:true,maxAge:maxAge*1000});
        var transporter = nodemailer.createTransport({
            service:'gmail',
        
            auth:{
                user:'ktraxeilos@gmail.com',
                pass:'ufff nbko evni duao'
            },
            tls:{
                rejectUnauthorized:false
            }
        })
        const mailoptions = {
            from: 'ktraxeilos@gmail.com',
            to:user.email,
            subject:'Verify your email',
            html:`<h2> Verify your email</h2>
                    <a href="http://localhost:3000/verify-email/?emailtoken=${user.Emailtoken}"> Click here </a>`
        }
        await transporter.sendMail(mailoptions,(err,info)=>{
            if(err){
                console.log(err)
            }else{
                console.log('Verification email sent');
            }
        })
        console.log(user);
        res.status(201).json(user);
        

    }catch(err){
      const errors =  handleErrors(err);
      res.status(400).json({errors});
        
    }
    
}
const login_post = async (req,res)=>{
    const {email,password} = req.body;
    try{
        const user = await User.login(email,password);
        const token = createToken(user._id);
        res.cookie('current_user',token,{httpOnly:true,maxAge:maxAge*1000});
        res.status(201).json(user);
        
    }catch(err){
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

const logout_get = (req,res)=>{
    res.cookie('current_user','',{httpOnly:true,maxAge:1});
    res.redirect('/login');
}
const waitingverification = (req,res)=>{
    const cookies = req.cookies;
    if(cookies.user_registered){
        // res.cookie('user_registered','',{httpOnly:true,maxAge:1})
        res.redirect('/');
    }else{
        res.sendFile(path.resolve('./views/AuthenticationPages/VerificationEmailSent.html'))
    }
    
}
const verifiedemail = async(req,res)=>{
   try{
    const emailtoken = req.query.emailtoken;
    const user =  await User.verifyemail(emailtoken);
    const token = createToken(user._id);
    res.cookie('current_user',token,{httpOnly:true,maxAge:maxAge*1000});
    res.cookie('user_registered',emailtoken,{httpOnly:true,maxAge:60*60*1000});
     // const response = await User.updateOne({email:'ktraxeilos@gmail.com'},{$set:{EmailVerified:true}});
     // res.status(200).json(response);
     res.sendFile(path.resolve('./views/AuthenticationPages/EmailVerified.html'))
   }catch(err){
        res.send('Error')
   }
}

module.exports = {
    signup_get,
    login_get,
    signup_post,
    login_post,
    logout_get,
    waitingverification,
    verifiedemail,
    
}