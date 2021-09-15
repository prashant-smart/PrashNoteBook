const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/prashNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"  // in this we write prashNoteBook by own to create database of name prashNoteBook otherwise by default it store in test
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connectToMongo.Sucessfully!");
    })
}
module.exports = connectToMongo;