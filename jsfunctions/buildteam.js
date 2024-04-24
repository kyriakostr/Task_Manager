


const endpoint = '/Dashboard/Build_Team/get';

const admin = document.querySelector('.admin');
const adminsearchbar = document.querySelector('.adminsearchbar');
const team = document.querySelector('.team');
const teamsearchbar = document.querySelector('.teamsearchbar');
const submit = document.querySelector('button');
const admin_tags = document.querySelector('.admin-tags');
const team_tags = document.querySelector('.team-tags');
const teamname = document.querySelector('.team-name');
const litags = [];
const admins = [];
const teamworkers = [];

teamname.addEventListener('input',()=>{
    teamname.value=teamname.value.replace(' ','');
})
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

const getteams = async()=>{

    try{
        const response = await fetch(endpoint,{method:'GET', });
        const users = await response.json();
        
        team.addEventListener('input',()=>{
            team.value=team.value.replace(' ','');
        })
        teamsearchbar.innerHTML='';
        
        // let last_word = admin.value.split(' ')[admin.value.split(' ').length-1];
        

        
        let  suggestions = users.filter((user)=>user.email.startsWith(team.value));
        suggestions = team.value=='' ? [] : suggestions;
        
        suggestions.forEach((user)=>{
            // if(!admin.value.includes(user.email)) 
            if(!litags.includes(user.email) )
            teamsearchbar.innerHTML+=`<div>${user.email}</div>`;
        });
        
        const suggestionslist = document.querySelectorAll('.teamsearchbar div');

       
        
        suggestionslist.forEach((element)=>{
            element.addEventListener('click',()=>{
                
                // const indexoflastletter = last_word.lastIndexOf(last_word[last_word.length-1]);
                // const restofword = element.textContent.length;
                // admin.value+=element.textContent.substring(indexoflastletter+1,restofword).trim();
                
                teamsearchbar.innerHTML='';
                team.value='';
                team_tags.insertAdjacentHTML('afterbegin',`<li>${element.textContent}<i>&#10005</i></li>`);
                
                const x = document.querySelector('.team-tags i');
                
                x.addEventListener('click',()=>{
                    const parent = x.parentElement;
                    const word = parent.textContent.substring(0,parent.textContent.length-1);
                    
                    litags.splice(litags.indexOf(word),1);
                    teamworkers.splice(teamworkers.indexOf(word),1);
                    
                    parent.remove();
                })
                
                teamworkers.push(element.textContent);
                litags.push(element.textContent);
              
            })
        })
    
        
        
    

    }catch(err){
        console.log(err);
    }
    
}

submit.addEventListener('click',async()=>{
    try{
        const user = await checkuser();
        const response = await fetch('/Dashboard/Build_Team',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name:teamname.value,
                admins:admins,
                teams:teamworkers,
                user_id: user._id
            })});
        const data = await response.json();
        teamname.value='';
        if(data){
            location.assign('/Dashboard/Your_Teams');
        }
    }
    catch(err){
        console.log(err);
    }
    
});


