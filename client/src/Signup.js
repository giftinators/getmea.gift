import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Signup extends Component {
  state = {
    open: false,
    email: '',
    password: '',
    verifyPassword: ''
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleEmailChange = (e, newValue) => {
    this.setState({email: newValue})
  }
  handlePasswordChange = (e, newValue) => {
    this.setState({password: newValue})
  }
  handleVerifyPasswordChange = (e, newValue) => {
    this.setState({verifyPassword: newValue})
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
        disabled={!this.state.email || !this.state.password}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <a href="#" onClick={this.handleOpen}>Creat an Account</a>
        <Dialog
          title="Create an account"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                onChange={this.handleEmailChange}
                hintText="email"
                floatingLabelText="email"
                type="email"
                value={this.state.email}
              /><br />
              <TextField
                onChange={this.handlePasswordChange}
                hintText="password"
                floatingLabelText="password"
                type="password"
                value={this.state.password}
                /><br />
              <TextField
                onChange={this.handleVerifyPasswordChange}
                hintText="verify password"
                floatingLabelText="verify password"
                type="password"
                value={this.state.verifyPassword}
                errorText="Passwords don't match"
              /><br />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const CreateAccountLink = () => (
  <div>Login or <a href="#">Create Account</a></div>
)
