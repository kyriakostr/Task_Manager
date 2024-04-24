const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteschema = Schema({
    title:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    task:{
        type:String,
        required:true
    },
    forwho:{
        type:Array,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    
    
   
});

const ToDoList = mongoose.model('ToDoList',noteschema);

module.exports = ToDoList;