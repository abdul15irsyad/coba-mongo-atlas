const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
require('./config/connect')

const user = require('./routes/user')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 4000

app.get('/',(req,res)=>{
  res.status(200).json({
    message: 'welcome to my simple rest api'
  })
})

app.use('/user',user)

app.listen(port,()=>console.log(`server running on http://localhost:${port}`))