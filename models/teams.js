const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamschema = Schema({
    name:{
        type:String,
        required:true
    },
    admins:{
        type:Array,
        required:true
    },
    team:{
        type:Array,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
});

const Teams = mongoose.model('team',teamschema);

module.exports = Teams;