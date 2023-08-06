const mongoose=require('mongoose')
const userSchema = new mongoose.Schema({
    

    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    picture:{
        type:String
    
    },
    
})

module.exports = new mongoose.model('user',userSchema)