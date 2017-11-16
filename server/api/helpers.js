const User = require('../../app/models/user');
const List = require('../../app/models/list');
const Item = require('../../app/models/item');

const getUserById = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findById(user_id)
    .select('-password') //don't send back password
    .populate({ //gets nested items
      path: 'wishlists',
      model: 'List',
      populate: {
        path: 'items',
        model: 'Item'
      }
    })
    .exec()
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('user does not exist');
      }

      resolve(user);
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUser = (username, loggedInUserId) => {
  return new Promise((resolve, reject) => {
    User.findOne({username: username})
    .select('-password') //don't send back password
    .populate({ //gets nested items
      path: 'wishlists',
      model: 'List',
      populate: {
        path: 'items',
        model: 'Item'
      }
    })
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

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({})
    .select('-password') //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((user) => {
      //check if user doesn't exist
      if (!user) {
        reject('no users');
      } else {
        resolve(user);
      }
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUserByUsername = (username) => {
  console.log('USERNAME BODY: ', user);
  return new Promise((resolve, reject) => {
    User.find({username: username})
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUsers) => {
      resolve(foundUsers)
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUserByName = (userFullName) => {
  var allNames = userFullName.split(' ')
  if(allNames.length === 1) {
    //if user only inputs one word, search both first and last name with it
    var user = {
      firstName: allNames[0].toLowerCase(),
      lastName: allNames[0].toLowerCase()
    };
  } else if (allNames.length === 0) {
    //if user search is empty populate with empty strings to avoid error
    var user = {
      firstName: '',
      lastName: ''
    };
  } else {
    //take first word to be firstName and last word to be lastName(ignires middle names)
    var user = {
      firstName: allNames[0].toLowerCase(),
      lastName: allNames[allNames.length-1].toLowerCase()
    };
  }

  return new Promise((resolve, reject) => {
    var allUsers = [];
    User.find({firstName: user.firstName})
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUser) => {
      allUsers = foundUser
      User.find({lastName: user.lastName})
      .select('-password')  //don't send back password
      .select('-wishlists') //don't send back wishlists
      .exec()
      .then((foundUser) => {
        allUsers = allUsers.concat(foundUser);
        resolve(allUsers)
      })
    })
    .catch((err) => {
      reject(err);
    })
  })
};

const getUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    email = email.toLowerCase()
    User.find({email: email})
    .select('-password')  //don't send back password
    .select('-wishlists') //don't send back wishlists
    .exec() //sends the query
    .then((foundUser) => {
      resolve(foundUser)
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


const updateList = (user_id, list_id, listUpdates) => {
  return new Promise((resolve, reject) => {
    //user_id should be from the session
    //make sure user_id is defined
    if (user_id){
      //update the list based on list id and user id and pass in the updates
      List.findOneAndUpdate({ _id:list_id, user_id: user_id }, {$set: listUpdates}, {new: true}).populate('items').exec()
      .then((list) => {
        //send back the updated list
        resolve(list);
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


const addItem = (user_id, item) => {
  return new Promise((resolve, reject) => {
    let savedItem;
    //user_id should be from the session
    //make sure user_id is defined
    if (user_id){
      //create new item
      const newItem = new Item(item);
      //save new item to database
      newItem.save()
      .then((newItem) => {
        //store the new item so we can access it later
        savedItem = newItem;
        //now we have to add the new item to the wishlists
        //find the list based on the list_id on the new item
        return List.findById(newItem.list_id).exec()
      })
      .then((list) => {
        //make sure user is owner of the list
        if (user_id == list.user_id){
          //add new item's id to the wishlist items array
          list.items.push(savedItem._id);
          return list.save();
        } else {
          //remove item from database
          Item.remove({ _id: savedItem._id });
          reject('logged in user does not own list');
        }
      })
      .then((list) => {
        //resolve with the newly added item
        resolve(savedItem);
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
}


const updateItem = (item_id, itemUpdates) => {
  return new Promise((resolve, reject) => {
    //user_id should be from the session
    //make sure user_id is defined
      //update the list based on list id and user id and pass in the updates
      Item.findOneAndUpdate({ _id:item_id }, {$set: itemUpdates}, {new: true}).exec()
      .then((item) => {
        //send back the updated list
        resolve(item);
      })
      .catch((err) => {
        //catch and return any errors
        reject(err);
      });
  })
};


const deleteItem = (user_id, item_id) => {
  return new Promise((resolve, reject) => {
    let deletedItem;
    //user_id should be from the session
    //make sure user_id is defined
    if (user_id){
      //find the item based on item id and user id and remove it
      Item.findOne({ _id:item_id, user_id: user_id })
      .then((item) => {
        //store the deleted item for use later
        deletedItem = item;
        //remove item from database
        return Item.remove({ _id: item_id, user_id: user_id }).exec();
      })
      .then(() => {
        //find the list of the deleted item
        return List.findById(deletedItem.list_id).exec()
      })
      .then((list) => {
        //remove item ref from the list
        list.items.pull(item_id);
        return list.save();
      })
      .then((list) => {
        //resolve with the id of the removed item
        resolve(item_id);
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
  getUserById,
  getAllUsers,
  getUser,
  getUserByName,
  getUserByUsername,
  getUserByEmail,
  createList,
  deleteList,
  updateList,
  addItem,
  updateItem,
  deleteItem
}
