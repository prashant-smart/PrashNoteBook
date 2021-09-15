const mongoose= require('mongoose');
const {Schema} = mongoose;

const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:  { type: String, require:true }, 
    discription: { type: String, require:true },
    tag:   { type: String, default:"General" },
    date: { type: Date, default: Date.now },
   });
module.exports=mongoose.model('Note',notesSchema);