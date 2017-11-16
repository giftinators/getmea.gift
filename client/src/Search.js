import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import MenuItem from 'material-ui/MenuItem';

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

  renderUsers(props) {
    var key = 5;
      return (
        this.props.users.data.map((user) => {
          return ( <MenuItem
            key={key++}
            // rightIcon={list.secret ? <VisibilityOff /> : <Visibility />}
            primaryText={user.firstName}
            onClick={ () => {
              this.props.history.push('/'+user.username)
              this.props.handleClose()
            }}
           />
          )
        })
      )
  }


  render() {
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
          {this.renderUsers()}
        </div>
      </Paper>
    </div>
  )
  }
}
