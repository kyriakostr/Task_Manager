



const current_date = document.querySelector('.current-date');
const form = document.querySelector('.add-events');
const todoevents = document.querySelector('.to-do-events');
const endpoint = '/Dashboard/Build_Team/get';
const adminsearchbar = document.querySelector('.adminsearchbar');
const submit = document.querySelector('button');
const admin_tags = document.querySelector('.admin-tags');
const litags = [];
const admins = [];

const fetchfunc = async (daytext,month,year)=>{
    const endpoint = `/Dashboard/Add_Note/`;
        const user = await checkuser();
        fetch(endpoint + `${daytext}`+ `/${month}`+`/${year}`+`/${user._id}`,{
        method: 'GET',
        
        }).then((response)=> {
            todoevents.innerHTML=`<div>loading content</div>`
           return response.json();
        }).
        then(
            returndata
        ).
        catch((err)=>console.log(err));
};
const fetchevents = async (month,year) =>{
    const endpoint = `/Dashboard/Add_Note/`;
    const user = await checkuser();
    fetch(endpoint +`${month}`+`/${year}`+`/${user._id}`,{
        method: 'GET',
        
        }).then((response)=> response.json()).
        then(
            getevents
            
        ).
        catch((err)=>console.log(err));
}
const getadmins = async()=>{

    try{
        const response = await fetch(endpoint,{method:'GET', });
        const users = await response.json();
        
        admin.addEventListener('input',()=>{
            admin.value=admin.value.replace(' ','');
        })
        adminsearchbar.innerHTML='';
        
        // let last_word = admin.value.split(' ')[admin.value.split(' ').length-1];
        

        
        let  suggestions = users.filter((user)=>user.email.startsWith(admin.value));
        suggestions = admin.value=='' ? [] : suggestions;
        
        suggestions.forEach((user)=>{
            // if(!admin.value.includes(user.email)) 
            if(!litags.includes(user.email))
            adminsearchbar.innerHTML+=`<div>${user.email}</div>`;
        });
        
        const suggestionslist = document.querySelectorAll('.adminsearchbar div');

       
        
        suggestionslist.forEach((element)=>{
            element.addEventListener('click',()=>{
                
                // const indexoflastletter = last_word.lastIndexOf(last_word[last_word.length-1]);
                // const restofword = element.textContent.length;
                // admin.value+=element.textContent.substring(indexoflastletter+1,restofword).trim();
                
                adminsearchbar.innerHTML='';
                admin.value='';
                admin_tags.insertAdjacentHTML('afterbegin',`<li>${element.textContent}<i>&#10005</i></li>`);
                
                const x = document.querySelector('.admin-tags i');
                
                x.addEventListener('click',()=>{
                    const parent = x.parentElement;
                    const word = parent.textContent.substring(0,parent.textContent.length-1);
                    
                    litags.splice(litags.indexOf(word),1);
                    admins.splice(admins.indexOf(word),1);
                    parent.remove();
                })
                
                admins.push(element.textContent);
                litags.push(element.textContent);
                
            })
        })
    
        
        
    

    }catch(err){
        console.log(err);
    }
    
}
const post= async (e)=>{
    e.preventDefault();
    const endpoint = `/Dashboard/Add_Note`;
    const user = await checkuser();
        fetch(endpoint,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(
            {
                title:form.title.value,
                user_id:user._id,
                forwho:litags,
                task:form.task.value,
                time:form.time.value,
                selecteddate:current_date.innerText
            }
        )
        
        }).then((response)=> response.json()).
        then((data)=>{
            
            if(data){
                location.assign(endpoint);
            }
        }).
        catch((err)=>console.log(err));
}


form.addEventListener('submit', post
);


const returndata = (data)=>{
    console.log(data);
    todoevents.innerHTML='';
    data.forEach(element => {
        todoevents.innerHTML+=`<div class="${element.title}"></div>`;
        const div = document.querySelector(`.${element.title}`);
        div.innerHTML+=`<li>${element.task}</li>`;
        div.innerHTML+=`<li>${element.title}</li>`;
        div.innerHTML+=`<li>${element.time}</li>`;
        div.innerHTML+=`<li>${element.forwho}</li>`;
    });
}

const getevents = (data) =>{
    const alldays = document.querySelectorAll('.dates .current-month-day');
   data.forEach((element)=>{
    const date = element.date.split('-')[0];
    alldays.forEach((day)=>{
         if(day.innerText===date) day.classList.add('event-calendar');
    })
    
   })
};
