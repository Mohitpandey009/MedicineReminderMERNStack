const mongoose = require('mongoose');
const DB = process.env.db
 const conn = mongoose.connect("mongodb://127.0.0.1:27017/DB").then(()=>{
    console.log("your connection is stablish");
 }).catch((e)=>{
    console.log("failear to connect database "+e);
 })
 module.exports = conn;