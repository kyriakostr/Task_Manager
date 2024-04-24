const path = require("path");

const ToDoList = require('../models/notes');
const User  = require('../models/user');
const Teams = require('../models/teams');
const Message = require('../models/messages');


const dashboardget = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/Dashboard.html'));
}
const addnote = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/Add_note.html'));

}
const buildyourteam = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/Buildyourteam.html'));
}
const postyourteam = async(req,res)=>{
    const {name,admins,teams,user_id} = req.body;
    
    try{
        const teamsresp = await Teams.create({name:name,admins:admins,team:teams,user_id:user_id}); 
        res.status(201).json(teamsresp);
    }catch(err){
        console.log(err);
    }

}
const getusers = async(req,res)=>{

    try{
        const users = await User.find();
        console.log(users);
        res.status(201).json(users);
    }catch(err){
        console.log(err);
    }

}
const getchats = async(req,res)=>{
    try{
        const id = req.params.id;
        
        const chats = await Message.find({senders:id});
        res.status(201).json(chats);
    }catch(err){
        console.log(err);
    }
}
const seeyourteam = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/Seeyourteam.html'));
}
const seeyourteamget = async(req,res)=>{
    const user_id = req.params.user_id;
    try{
        const teams =await Teams.find({user_id:user_id});
        res.status(201).json(teams);

    }catch(err){
        console.log(err);
    }
}
const getevents = (req,res)=>{
    
    const month = req.params.month;
    const year = req.params.year;
    const user_id = req.params.user_id;
    
    ToDoList.find({date:{$regex:`.*${month}-${year}.*`},user_id:user_id}).then((result)=>res.json(result)).
    catch((err)=>console.log(err));
    
}
const geteventsfornotes = (req,res)=>{
    const day = req.params.day;
    const month = req.params.month;
    const year = req.params.year;
    const user_id = req.params.user_id;
    
    ToDoList.find({date:`${day}-${month}-${year}`,user_id:user_id}).then((result)=>res.json(result)).
    catch((err)=>console.log(err));
    
}
const postevents = (req,res)=>{
    console.log(req.body);
    
    
    const note = new ToDoList({
        title:req.body.title,
        user_id:req.body.user_id,
        forwho: req.body.forwho,
        task: req.body.task,
        date:req.body.selecteddate,
        time:req.body.time
    });
    note.save().then((result)=>{
        
        return res.status(201).json(result);
    }).catch((err)=>console.log(err));
}

const getchatrooms = (req,res)=>{
    res.sendFile(path.resolve('./views/AuthenticationPages/Chatrooms.html'))
}
const userchat = (req,res)=>{
    
    
    res.sendFile(path.resolve('./views/AuthenticationPages/PrivateChat.html'));
}

const postmessage = async(req,res)=>{
    try{
        const {senders,sender,message,time,date,fulldate} = req.body;
        console.log(fulldate);
        const getmessage = await Message.createmessage(senders,sender,message,time,date,fulldate);
        console.log(getmessage);
        res.json(getmessage);
    }catch(err){
        console.log(err)
    }
}

const getoldmessages = async(req,res)=>{
   
    try{
        const senderid = req.params.id;
        const userid = req.query.user;
        const response = await Message.findOne({senders:[senderid,userid]});
        res.status(201).json(response);

    }catch(err){
        console.log(err);
    }
}


module.exports = {
    dashboardget,
    addnote,
    buildyourteam,
    postyourteam,
    getusers,
    getchats,
    seeyourteam,
    seeyourteamget,
    getevents,
    geteventsfornotes,
    postevents,
    getchatrooms,
    userchat,
    postmessage,
    getoldmessages
    
}