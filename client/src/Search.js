import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import axios from 'axios';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/
const style = {
  RightBtns: {
      marginTop: 5,
      marginRight: 5
    },
}
export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test:0
    };


    this.setStore = (obj) => {
      this.setState(obj);
    };
  }

  handleAddFriend(user, e) {
    e.stopPropagation();//prevents the onClick for the parent MenuItem
    console.log('FRIEND DATA: ', user);
    axios.post('api/friendRequest', {
      initiatingUser_id: 1,
      requestedUser_id: user._id
    })
  }

  renderUsers(props) {
    var capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
    var key = 5;
      return (
        this.props.users.data.map((user) => {
          console.log('USER SEARCH DATA: ', user);
          var fullName = capitalize(user.firstName) + ' ' + capitalize(user.lastName)
          var displayText = fullName + '('+ user.username + ')'
          return ( <MenuItem
            key={key++}
            // rightIcon={list.secret ? <VisibilityOff /> : <Visibility />}
            primaryText={displayText}
            onClick={ () => {
              this.props.history.push('/'+user.username)
              this.props.handleClose()
            }}
            rightIcon={<PersonAdd onClick={this.handleAddFriend.bind(this, user)}/>}
           />
          )
        })
      )
  }


  render() {
    if(this.props.users.data ) {
      return (
        <div className="search-sidebar"
          style={{'flex':'1'}}
          >
            <Paper className="leftSideWishlistPaper" style={{maxWidth: 400, marginTop: '50px'}}>
              <AppBar title={`Search results`}
                iconElementLeft={<div></div>}
                style={{maxWidth: 400}}
                >
                </AppBar>
                <div className="wishlistsOnLeft">
                  {this.props.users.data && this.renderUsers()}
                </div>
              </Paper>
            </div>
      )
    } else {
      return <div></div>
    }
  }
}
