import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      register: false,
      username: '',
      password: '',
      verifyPassword: '',

    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({open: false});
    };

    this.toggleRegister = () => {
      this.setState({register: !this.state.register})
    };

    this.handleUsernameChange = (e, newValue) => {
      this.setState({username: newValue})
    };

    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    };

    this.handleVerifyPasswordChange = (e, newValue) => {
      this.setState({verifyPassword: newValue})
    };

    this.handleLoginSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/login', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if (response.data) {
          this.props.setCurrentUser(response.data);
          this.setState({open: false});
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    this.handleRegisterSubmit = (e) => {
      e.preventDefault();
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if(response.data) {
          this.props.setCurrentUser(response.data);
          this.setState({open: false});
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    this.handleLogout = (e) => {
      e.preventDefault();
      console.log('logging out');
      axios('/api/logout')
      .then((response) => {
        this.props.setCurrentUser({});
      })
      .catch(function (error) {
        console.log(error);
      });
    };
  };


  render() {
    var username = this.props.user.username;

    const loginActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={!this.state.username || !this.state.password}
        onClick={this.handleLoginSubmit}
      />
    ];

    const registerActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={
                  !this.state.username
                  || !this.state.password
                  || this.state.password !== this.state.verifyPassword
                }
        onClick={this.handleRegisterSubmit}
      />
    ];

    var welcomeBack = (
      <div>
        <Link to={'/'+username}><RaisedButton className="MyListsBtn" secondary label={"My Lists"} /></Link>
        <FlatButton className="LogoutBtn" secondary label={"Logout, "+username} onClick={this.handleLogout} />
      </div>
    );

    var loginDiv = (
      <div>
        <FlatButton className="LoginBtn" secondary label="Login" onClick={this.handleOpen} />
        <Dialog
          title="Login"
          actions={loginActions}
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
            <p>Don't have an account? <span style={{cursor: 'pointer'}} onClick={this.toggleRegister}>Create one</span></p>
          </div>
        </Dialog>
      </div>
    );

    var registerDiv = (
      <div>
        <Dialog
          title="Create an account"
          actions={registerActions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form onSubmit={this.handleSubmit}>
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
              <TextField
                onChange={this.handleVerifyPasswordChange}
                hintText="verify password"
                floatingLabelText="verify password"
                type="password"
                value={this.state.verifyPassword}
                errorText={this.state.password === this.state.verifyPassword ? '' : "Passwords do not match"}
              /><br />
            </form>
            <p>Already have an account? <span style={{cursor: 'pointer'}} onClick={this.toggleRegister}>Login</span></p>
          </div>
        </Dialog>
      </div>
    )

    if (this.state.open) {
      return this.state.register ? registerDiv : loginDiv
    } else {
      return (
        <div className="RightBtns">
        {
          username ? welcomeBack : loginDiv
        }
        </div>
      )
    }
  }


}
