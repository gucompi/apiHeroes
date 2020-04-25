const mongoose = require('mongoose')
const tokenSchema = mongoose.Schema({
    email:String
})

module.exports = mongoose.model("token",tokenSchema)
