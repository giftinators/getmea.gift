var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
  title: {type: String, required: true},
<<<<<<< HEAD
  user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
=======
  id: Number,
  user_id: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
>>>>>>> cleaned up some syntax and added comments
  secret: Boolean,
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }]
})

var List = mongoose.model('List', listSchema);


module.exports = List;
