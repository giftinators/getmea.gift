import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: true,
      username: '',
      password: '',
      verifyPassword: ''
    };

    this.toggleOpen = () => {
      this.setState({open: !this.state.open})
    }
    this.handleOpen = () => {
      this.setState({open: true});
    };
    this.handleClose = () => {
      this.setState({open: false});
    }
    this.handleEmailChange = (e, newValue) => {
      this.setState({username: newValue})
    };
    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    };
    this.handleVerifyPasswordChange = (e, newValue) => {
      this.setState({verifyPassword: newValue})
    };


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
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Create an account"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
              <TextField
                onChange={this.handleEmailChange}
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
              <TextField
                onChange={this.handleVerifyPasswordChange}
                hintText="verify password"
                floatingLabelText="verify password"
                type="password"
                value={this.state.verifyPassword}
                errorText={this.state.password === this.state.verifyPassword ? '' : "Passwords don't match"}
              /><br />
            </form>
            <p>Already have an account? <Link to={'/login'} open={true} onClick={this.toggleOpen}>Login</Link></p>
          </div>
        </Dialog>
      </div>
    );
  }
}
