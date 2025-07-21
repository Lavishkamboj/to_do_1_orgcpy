const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    task:String,
    username:String
    

})
const userTaskModel=mongoose.model('user_task',userSchema);
module.exports=userTaskModel;