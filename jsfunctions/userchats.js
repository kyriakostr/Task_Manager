
const userslist = document.querySelector('.users');
const chatrooms = document.querySelector('.chats');

const fetchusers = async()=>{

    try{
        const cookieuser = await checkuser();
        
        const response = await fetch('/Dashboard/Chatrooms/GET',{
            method:'GET'
        });
        const users = await response.json();
        users.forEach(user => {
            if(user.email!=cookieuser.email)
            userslist.innerHTML+=`<a href="/Dashboard/Chatrooms/${user._id}">${user.email} </a>`;
        });
        

    }catch(err){
        console.log(err);
    }

}
const fetchchats = async()=>{
    try{
        const listoflastmessages = [];
        const user = await checkuser();
        
        const responseusers = await fetch('/Dashboard/Chatrooms/GET',{
            method:'GET'
        });
        const users = await responseusers.json();
        
        const response = await fetch(`/Dashboard/Chatrooms/chats/${user._id}`,{method:'GET'});
        const chats = await response.json();

        chats.forEach(chat=>{
            
            const messagelist = chat.messagelist;
            
            console.log(messagelist);
            chat.senders.forEach(sender=>{
                let email;
                let id;
                users.forEach(user=>{
                    if(user._id==sender) {
                        email=user.email;
                        id = user._id;
                    }
                })

                if(sender!=user._id) {
                   const date =  Object.values(messagelist[messagelist.length-1])[0].fulldate;
                   const time =  Object.values(messagelist[messagelist.length-1])[0].time;
                   const message = Object.values(messagelist[messagelist.length-1])[0].message;
                   const lastusersent = Object.keys(messagelist[messagelist.length-1])[0];
                   console.log(date,time,lastusersent,message,id);
                   listoflastmessages.push({sendto:email,id:id,lastusersent:lastusersent,date:date,time:time,message:message});
                    
                }
            })
            
        });
        const temp = listoflastmessages.sort(sortarr);
        console.log(temp)
        temp.forEach(chat=>{
            chatrooms.innerHTML+=`<div><a href="/Dashboard/Chatrooms/${chat.id}">${chat.sendto}: ${chat.lastusersent} ${chat.message}</a></div>`
        })

    }catch(err){
        console.log(err);
    }
}

function sortarr(a,b){
   
   console.log(new Date(a.date).valueOf(),new Date(b.date).valueOf())
    if(new Date(a.date).valueOf()>new Date(b.date).valueOf()){
        return -1;
    }else if(new Date(a.date).valueOf()<new Date(b.date).valueOf()){
        return 1;
    }else{
        return 0;
    }
}
fetchusers();
fetchchats();