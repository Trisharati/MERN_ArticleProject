const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()

const app=express()
const cors=require('cors')


app.use(cors())


app.use(express.json())



app.use(express.urlencoded({extended:true}))

const router=require('./router')
app.use('/api',router)




const dbDriver='mongodb+srv://trisharati:vE9tAJ40v0HkfNxX@cluster0.kkmvasl.mongodb.net/Article'
const port = process.env.PORT || 1900

mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then((res)=>{
    app.listen(port,()=>{
        console.log('DB is connected')
        console.log(`http://localhost:${port}`)
    })
})
.catch((err)=>{
    console.log(err)
})