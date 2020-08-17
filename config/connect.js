const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
},(err)=>{
  console.log(err ? err : 'mongo db connected!')
})

module.exports = mongoose