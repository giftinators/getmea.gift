import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import React from 'react';
import axios from 'axios';

export default class FriendsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      pending: []
    };
    this.retrieveFriends = this.retrieveFriends.bind(this);
  }

  componentWillMount() {
    this.retrieveFriends();
  }

  retrieveFriends() {
    var pending = [];
    var friends = [];
    var userDataFriends = this.props.userData.friends;
    console.table(userDataFriends);
    for (var user in userDataFriends) {
      axios
        .post('api/search', {
          searchMethod: 'id',
          userInput: user
        })
        .then(foundUser => {
          if (userDataFriends[user].friendStatus === 'pending') {
            pending.push(foundUser.data);
          } else if (userDataFriends[user].friendStatus === 'friend') {
            friends.push(foundUser.data);
          }
          this.setState({
            pending: pending,
            friends: friends
          });
        })
        .catch(err => {
          console.log('Handle search error: ', err);
        });
    }
  }

  render() {
    return (
      <div className="friends-list">
        <Paper>
          <AppBar title="Pending" iconElementLeft={<div />} />
          {this.state.pending.map((pendingFriend, index) => {
            return (
              <MenuItem key={'pending_' + index} primaryText={pendingFriend.firstName + ' ' + pendingFriend.lastName} />
            );
          })}
          <AppBar title="All Friends" iconElementLeft={<div />} />
          {this.state.friends.map((friend, index) => {
            return <MenuItem key={'friend_' + index} primaryText={friend.firstName + ' ' + friend.lastName} />;
          })}
        </Paper>
      </div>
    );
  }
}
