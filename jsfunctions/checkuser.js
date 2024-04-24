
const endpoint_1 = `/id`;
let user_id;


const checkuser = async () =>{
    try{
        const response = await fetch(endpoint_1,  {method:'GET', });
        const user = await response.json();
       
        return user;
       
    }catch(err){
        console.log(err);
    }
}




