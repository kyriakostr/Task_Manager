
const socket = io();
const message = document.querySelector('input');
const btn = document.querySelector('.send-message');
const output = document.querySelector('.output');
const feedback = document.querySelector('.feedback');

const url = location.pathname.split('/');
const id = url[url.length-1];
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString();

const func = async ()=>{
    const user = await checkuser();
    socket.emit('connections',{user});
}

const getoldmessages = async()=>{
    const user = await checkuser();
    const response = await fetch(`/Dashboard/getoldmessages/${id}/?user=${user._id}`,{method:'GET'});
    const oldmessages = await response.json();
    
    if(oldmessages){
        const messagelist = oldmessages.messagelist;
        
        messagelist.forEach(message => {
        
        const messagetext =  Object.values(message)[0].message;
        const messagetime = Object.values(message)[0].time;
        const messagedate = Object.values(message)[0].date;
        const sender = Object.keys(message)[0]===user.email?'Me':Object.keys(message)[0];
        // const indexofmessage = messagelist.indexOf(message);

        // let previousmessage;
        // let previousmessagetime;
        // let previousmessagehour;
        // let messagehour;

        // if(indexofmessage!=0) {
        //     previousmessage = messagelist[indexofmessage-1];
        //     previousmessagetime =  Object.values(previousmessage)[0].time;
        //     previousmessagehour = parseInt(previousmessagetime.split(':')[1]);
        //     messagehour = parseInt(messagetime.split(':')[1]);
        //     console.log(previousmessagehour+10<messagehour);
        // }
        
        if(new Date().toLocaleDateString()!=messagedate){

                output.innerHTML+=`${messagedate} <br>`;

            
        }  
        else{
            output.innerHTML+='Today <br>';
            
        }
        output.innerHTML+=`<div>${sender}:${messagetext}  ${messagetime} <br>`;
        
    });
    }
    
}

getoldmessages();
func();

message.addEventListener('input',async()=>{
    const user = await checkuser();
    socket.emit('typing',{user,message:message.value,sendto:id});
})

btn.addEventListener('click',async()=>{
    
    try{
        
        const user = await checkuser();

        socket.emit('send-message',{
            user:user,
            sendto:id,
            message: message.value
            });

        const messagesent = message.value;

        output.innerHTML+=`Me:${message.value} ${time}<br>`;
        message.value = '';

        const response = await fetch(`/Dashboard/Chatrooms/${id}`,{method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            senders:[user._id,id],
            sender:user.email,
            message:messagesent,
            time:time,
            date:date,
            fulldate: dateForDateTimeInputValue(new Date())
        })});
        // const data = await response.json();
        // console.log(data);
        
       
        
    }catch(err){
        console.log(err);
    }
});

socket.on('send-message',async(data)=>{

    feedback.innerHTML='';
    
    
    output.innerHTML+=`${data.user.email}:${data.message} ${time}<br>`
})
socket.on('typing',async(data)=>{
    console.log(data.message)
    if(data.message.length!=0){
        feedback.innerHTML=`${data.user.email} is typing...`;
    }else{
        feedback.innerHTML='';
    }
    

})
const dateForDateTimeInputValue = date => new Date(date.getTime() + new Date().getTimezoneOffset() * -60 * 1000).toISOString().slice(0, 19)