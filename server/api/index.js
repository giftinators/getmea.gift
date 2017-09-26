const router = require('express').Router();
const User = require('../../app/models/user');
const List = require('../../app/models/list');
const Item = require('../../app/models/item');
const helpers = require('./helpers');

//get all users
//We actually won't need this for our app, but good for testing db
router.get('/users', (req, res) => {
  User.find().exec((err, users) => {
    res.send({users})
  })
})

//get user
router.get('/users/:username', (req, res) => {
  //TODO: get user id from session
  var loggedInUserId = '59c9ca9d9abf99a03260e2ed';

  //we want to send in the logged in user's id
  //so we can determine if we should send back secret wishlists
  helpers.getUser(req.params.username, loggedInUserId)
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    res.status(404).send({err});
  })
})


//create a new user when user signs up
router.post('/signup', (req, res) => {
  console.log(req.body)
  var username = req.body.username;
  var password = req.body.password;

  //check to see if username is in database
  User.findOne({username: username})
  .exec(function (err, user) {
    //if not, create a new user and save into db
    if(!user) {
      var newUser = new User({
        username: username,
        password: password
      })
      newUser.save(function (err, newUser) {
        if (err) {
          res.status(500).send({err})
        } else {
          res.send({newUser})
        }
      })
      //else tell the user the account already exists
    } else {
        console.log('Account already exists');
        res.redirect('/');
      }
  })
})


//add new list to user
/* Example POST data
{
	"title": "Secret List",
	"secret": true
}
*/
router.post('/list', (req, res) => {
  var title = req.body.title;
  var secret = req.body.secret;
  //TODO: get user id from session
  var user_id = '59c9ca9d9abf99a03260e2ed';

  helpers.createList({
    title: title,
    secret: secret,
    user_id: user_id
  })
  .then((list) => {
    res.send(list);
  })
  .catch((err) => {
    res.status(404).send({err});
  });
});


//delete list
router.delete('/list/:id', (req, res) => {
  var list_id = req.params.id;
  //TODO: get user id from session
  var user_id = '59c9ca9d9abf99a03260e2ed';

  helpers.deleteList(user_id, list_id)
  .then((id) => {
    res.send(`Deleted Wishlist: ${id}`);
  })
  .catch((err) => {
    res.status(404).send({err});
  });
});


//add an item to the list (specific to the user)
router.post('/item', (req, res) => {
  var title = req.body.title;
  var price = req.body.price;
  var comments = req.body.comments;
  var url = req.body.url;
  var imageUrl = req.body.secret;
  var timestamp = req.body.timestamp;
  var purchased = req.body.purchased;

  Item.findOne({title: title})
  .exec(function (err, item) {
    var newItem = new Item({
      title: title,
      price: price,
      comments: comments,
      url: url,
      image_url: imageUrl
    })
    newItem.save(function (err, newItem) {
      if (err) {
        res.status(500).send({err})
      } else {
        res.send({newItem})
      }
    })

  })
})


module.exports = router;
