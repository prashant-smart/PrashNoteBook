const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:  { type: String, require:true }, 
    email: { type: String, require:true ,unique:true},
    password:   { type: String, require:true },
    date: { type: Date, default: Date.now },
   });

const User=mongoose.model('User',userSchema);
module.exports=User;


// module.exports=mongoose.model('User',userSchema);