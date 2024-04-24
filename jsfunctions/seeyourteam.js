const body = document.querySelector('body');

const endpoint = '/Dashboard/Your_Teams/';

const getteams = async()=>{
    try{
        const user = await checkuser();
        
        const response = await fetch(endpoint+`${user._id}`,{method:'GET'});
        const teams = await response.json();
        
        if(teams.length===0){
            body.innerHTML+='No teams yet';
        }else{
            teams.forEach(element => { //make the the UI with the response
            body.innerHTML+=`<div class="${element.name}">${element.name}</div>`;
            
            const team = document.querySelector(`.${element.name}`);

            team.innerHTML+=`<div class="admins ${element.name}">Admins:</div>`;
            team.innerHTML+=`<div class="teams ${element.name}">Team:</div>`;

            const admins = document.querySelector(`.admins.${element.name}`);
            const members = document.querySelector(`.teams.${element.name}`);
             
            element.admins.forEach((admin)=>{
                admins.innerHTML+=`${admin} `;
            })
            element.team.forEach((member)=>{
                members.innerHTML+=`${member} `;
            })
        });
        }
        

    }catch(err){
        console.log(err);
    }
}

getteams();