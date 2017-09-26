import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Signup from './Signup.js';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Login extends Component {
  state = {
    open: false,
    username: '',
    password: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleUsernameChange = (e, newValue) => {
    this.setState({username: newValue})
  }
  handlePasswordChange = (e, newValue) => {
    this.setState({password: newValue})
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.state.username || !this.state.password}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton secondary label="Login" onClick={this.handleOpen} />
        <Dialog
          title={CreateAccountLink()}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                onChange={this.handleUsernameChange}
                hintText="username"
                floatingLabelText="username"
                value={this.state.username}
              /><br />
              <TextField
                onChange={this.handlePasswordChange}
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={this.state.password}
              /><br />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const CreateAccountLink = () => (
  <div>Login or <Signup /></div>
)
