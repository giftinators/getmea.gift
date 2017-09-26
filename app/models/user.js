var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  wishlists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }]
})

var User = mongoose.model('User', userSchema);


module.exports = User;
