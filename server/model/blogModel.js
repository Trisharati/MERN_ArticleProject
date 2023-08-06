const mongoose=require('mongoose')
const blogSchema = new mongoose.Schema({

    userId:{
        type:mongoose.Schema.Types.ObjectId
    },
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    comments:[{
        username:String,
        text:String
    }],
    hide:{
        type:Boolean,
        default:false
    },
    showContent:{
        type:Boolean,
        default:false
    }
   
})

module.exports = new mongoose.model('blog',blogSchema)