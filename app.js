const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socket = require('socket.io');
const authroutes = require('./routes/authroutes');
const dashboardroutes = require('./routes/dashboardroutes');
const cookieparser = require('cookie-parser');
const {requireauth,checkuser,loggedinuser} = require('./middleware/authmiddleware');
const nocache = require("nocache");

const dbURI = "mongodb+srv://Kyriakos:IoCvDoim7woKiuDS@taskmanager.vlcxepj.mongodb.net/TaskManager?retryWrites=true&w=majority"
const server = app.listen(3000);
const io = socket(server);
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true}).
then((result)=>server)
.catch((err)=>console.log(err));

var users=[];
io.on('connection',(socket)=>{
   
   socket.on('connections',(data)=>{
    const userid = data.user._id;
    users[userid]=socket.id;
    console.log(users);
   })
    socket.on('send-message',(data)=>{
        
        
        socket.to(users[data.sendto]).emit('send-message',data);
    });
    socket.on('typing',(data)=>{
        
        socket.to(users[data.sendto]).emit('typing',data);
    });
    
})

app.use(express.static('public'));
app.use(express.static('jsfunctions'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieparser());
app.use(nocache());


app.use('/',authroutes);
app.use('/Dashboard',dashboardroutes);
app.get('/',checkuser,(req,res)=>{
    res.sendFile('./views/index.html',{ root: __dirname });
});

app.get('/about',(req,res)=>{
    res.sendFile('./views/about.html',{ root: __dirname });
});


app.get('/HomePage/:id',requireauth,(req,res)=>{
    if(req.cookies.user_registered) res.cookie('user_registered','',{httpOnly:true,maxAge:1});
    res.sendFile('./views/AuthenticationPages/LoggedinHomePage.html',{ root: __dirname });
})

app.get('/:id',loggedinuser);

app.use((req,res)=>{
    res.status(404).sendFile('./views/404.html',{ root: __dirname });
});