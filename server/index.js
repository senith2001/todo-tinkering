const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const PORT = process.env.PORT || 3000
const ATLAS_URI = process.env.ATLAS_URI
const app = express()

app.use(bodyparser.json())
app.use(cors())

mongoose.connect(ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology:true
}).then(() => {
  console.log('connected to mongodb')
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })
}).catch((err)=>{
  console.log(err)
})

const userSchema = mongoose.Schema({
  email:String,
  password:String,
  todos:[]
},{
  versionKey:false
})

const User = mongoose.model("User",userSchema)

app.post('/register',async (req,res)=>{
  console.log(req.body)
  let arr = await User.find({'email':req.body.email})
  if(arr.length === 0){
  //can register
  const newUser = new User({email : req.body.email,
                        password:req.body.password,
                        todos:[]
                      })
  const sendData = await newUser.save()                      
  console.log('registered',sendData)
  res.send(sendData);


  //write to database
  //redirect to todo page
  }
  else{
  //can't register
  res.send('can\'t register')
  }

})
app.post('/input', async (req, res) => {
  console.log(req.body)
  let arr = await User.find({'email':req.body.email})
  if(arr.length === 0){
    res.send('user email not found')
  }
  else if(arr.length === 1 && req.body.password === arr[0].password){
    
    res.json(arr[0].todos)
    //send user's todo data
    console.log(arr)
  }else{
    res.send('error multiple users found problem with mongodb database')
  } 
})

app.put('/saveTodo',async (req,res)=>{
  console.log(req.body)
  User.find({'email':req.body.email}).then((response)=>{
    console.log(response)

  })

})

process.on("SIGINT",()=>{
  mongoose.connection.close().then(()=>{
    console.log('Mongodb connection closed')
    process.exit(0)
  })
})
