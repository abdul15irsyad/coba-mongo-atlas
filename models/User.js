const mongoose = require('mongoose')
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new Schema({
  name: {type: String,required: true},
  username: {type: String,required: true, index: true},
  password: {type: String,required: true},
  hashedPassword: {type: String,required: true}
})

userSchema.plugin(mongoosePaginate)

const User = mongoose.model("users",userSchema)
module.exports = User