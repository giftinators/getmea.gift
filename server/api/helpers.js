const User = require('../../app/models/user');
const List = require('../../app/models/list');
const Item = require('../../app/models/item');

const getUser = (username, loggedInUserId) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
    .select('-password') //don't send back password
    .populate('wishlists')
    .exec()
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('user does not exist');
      }

      //Only return secret wishlists if user is owner
      if (loggedInUserId == user._id) {
        resolve(user);
      } else {
        //If user is not owner filter out the secret wishlists
        let publicWishlists = user.wishlists.filter((wishlist) => {
          return wishlist.secret === false;
        });
        user.wishlists = publicWishlists;
        resolve(user);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const createList = (list) => {
  return new Promise((resolve, reject) => {
    let savedList;
    //user_id should be from the session
    //make sure user_id is defined
    if (list.user_id){
      //create new list
      const newList = new List(list);
      //save new list to database
      newList.save()
      .then((newList) => {
        //store the new list so we can access it later
        savedList = newList;
        //now we have to add the new list to the user's wishlists
        //find the user based on the user's id
        return User.findById(list.user_id).exec()
      })
      .then((user) => {
        //add new list to the user's list of wishlists
        user.wishlists.push(savedList._id);
        return user.save();
      })
      .then((user) => {
        //resolve with the newly added wishlist
        resolve(savedList);
      })
      .catch((err) => {
        //catch and return any errors
        reject(err);
      });
    } else {
      //probaby not logged in
      reject('user not logged in');
    }
  })
};

const deleteList = (user_id, list_id) => {
  return new Promise((resolve, reject) => {
    //user_id should be from the session
    //make sure user_id is defined
    if (user_id){
      //find the list based on list id and user id and remove it
      List.find({ _id:list_id, user_id: user_id }).remove().exec()
      .then(() => {
        return User.findById(user_id).exec()
      })
      .then((user) => {
        //remove list ref from the user's list of wishlists
        user.wishlists.pull(list_id);
        return user.save();
      })
      .then((user) => {
        //resolve with the id of the removed list
        resolve(list_id);
      })
      .catch((err) => {
        //catch and return any errors
        reject(err);
      });
    } else {
      //probaby not logged in
      reject('user not logged in');
    }
  })
};

module.exports = {
  getUser: getUser,
  createList: createList,
  deleteList: deleteList
}
