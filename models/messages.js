const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageschema = Schema({
    senders:{
        type:Array,
        required:true
    },
    messagelist:{
        type:Array,
        
    },
    // date:{

    // },
    // time:{
    //     type:String,
    //     required:true
    // }
});
messageschema.statics.createmessage = async function(senders,sender,message,time,date,fulldate){
    const re = senders.concat().reverse();
    
    const response = await this.find({$or:[{senders:senders},{senders:re}]});
    var arr = {};
    arr[sender]={message:message,time:time,date:date,fulldate:fulldate};
    
    if(response.length!=0){
        const sendmessage = await this.updateOne({$or:[{senders:senders},{senders:re}]},{$push:{messagelist:arr}});
        return sendmessage;
    }else{
        
        const createmessage = await this.create({senders:senders,messagelist:[arr]});
        return createmessage;
    }

}

const Message = mongoose.model('message',messageschema);
module.exports= Message;