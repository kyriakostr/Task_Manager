const jwt = require('jsonwebtoken');
const User = require('../models/user');

const requireauth = (req,res,next)=>{
    const token = req.cookies.current_user;
    if(token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                // console.log(decodedToken);
                
                next();
            }
        });
    }else{
        res.redirect('/login');
    }
}

const checkuser = (req,res,next)=>{
    const token = req.cookies.current_user;
    if(token){
        jwt.verify(token,'secret',(err,decodedToken)=>{
            if(err){
                console.log(err);
                res.redirect('/login');
            }else{
                
                res.redirect(`/HomePage/${decodedToken.id}`);
                
                
            }
        });
    }else{
        
        next();
    }
    
}
const loggedinuser = (req,res,next)=>{
    const token = req.cookies.current_user;
    if(token){
        jwt.verify(token,'secret',async(err,decodedToken)=>{
            if(err){
                console.log(err);
                next();
            }else{
                const user = await User.findById(decodedToken.id);
                res.status(201).json(user);
                
                
            }
        });
    }
    
}

module.exports = {requireauth,checkuser,loggedinuser}