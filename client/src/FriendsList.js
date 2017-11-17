import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';



const FriendsList = (props) => {
  console.table( props.userData.friends);
  var pending = []
  var friends = []
  var obj = props.userData.friends
  for ( var user in props.userData.friends ) {
    console.log('USER DATA: ', obj[user].friendStatus );
    if ( obj[user].friendStatus === 'pending' ) {
      console.log('INSIDE PENDING');
      axios.post('api/search', {
        searchMethod:'id',
        userInput: user
      })
      .then((foundUser) => {
        console.log('USERS FOUND IN pendingList: ', foundUser);
        pending.push(foundUser)
      })
      .catch((err) => {
        console.log('Handle search error: ', err);
      })
    } else if ( obj[user].friendStatus === 'friend') {
      axios.post('api/search', {
        searchMethod:'id',
        userInput: user
      })
      .then((foundUser) => {
        console.log('USERS FOUND IN FriendsList: ', foundUser);
        pending.push(foundUser)
      })
      .catch((err) => {
        console.log('Handle search error: ', err);
      })
    }
  }
  return (
    <div className="friends-list">
      <Paper>
        <AppBar
          title="Pending"
          iconElementLeft={<div></div>}
          />
          <MenuItem key="1" primaryText="it's me" />
          <MenuItem key="2" primaryText="hello" />
          <Divider />
          <MenuItem key="3" primaryText="it's me" />
          <AppBar
          title="All Friends"
          iconElementLeft={<div></div>}
          />
          <MenuItem key="4" primaryText="hello" />
          <Divider />
          <MenuItem key="5" primaryText="it's me" />
      </Paper>
    </div>
  );
};

export default FriendsList;
