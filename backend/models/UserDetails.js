const mongoose=require('mongoose');
const UserDetails= new mongoose.Schema({ 
    name:{type:String},
    email:{type:String},
    password:{type:String},
    address: {type :String},
    
    
});
module.exports =mongoose.model("UserDetails",UserDetails);