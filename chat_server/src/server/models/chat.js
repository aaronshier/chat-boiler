var mongoose = require('mongoose')

var chatSchema = mongoose.Schema({
    avatar: String,
    chaticon: String,
    mention: String,
    message: String,
    username: String,
    user_id: String,
})
module.exports = mongoose.model('Chat', chatSchema)
