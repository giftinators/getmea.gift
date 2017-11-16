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
      verifyPassword: '',
      firstName: '',
      lastName: '',
      email: ''
    };

    this.setStore = (obj) => {
      this.setState(obj);
    }
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

    this.handleRegisterSubmit = (e) => {
      e.preventDefault();
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      })
      .then((response) => {
        if(response.data) {
          this.props.setCurrentUser(response.data);
          this.setState({open: false});
          if (this.props.history.location.pathname === '/'){
            this.props.history.push('/'+this.state.username)
          }
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    };

    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log('username:', this.state.username, 'pass:', this.state.password)
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        if(response.data) {
          console.log(response);
          this.props.setCurrentUser(response.data);
          this.setState({open: false});
          if (this.props.history.location.pathname === '/'){
            this.props.history.push('/'+this.state.username)
          }
        } else {
          console.log(response);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
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
        disabled={
          !this.state.username
          || !this.state.password
          || !this.state.firstName
          || !this.state.lastName
          || this.state.password !== this.state.verifyPassword
        }
        onClick={this.handleRegisterSubmit}
      />,
    ];

    return (
      <div>
        <div className="register">
          <Dialog
            title="Create an account"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            <div style={{textAlign: 'center'}}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  onChange={(e, username) => {this.setStore({username:username})}}
                  hintText="username"
                  floatingLabelText="username"
                  value={this.state.username}
                /><br />
                <TextField
                  onChange={(e, newValue) => {this.setStore({firstName:newValue})}}
                  hintText="first name"
                  floatingLabelText="first name"
                  value={this.state.firstName}
                /><br />
                <TextField
                  onChange={(e, newValue) => {this.setStore({lastName:newValue})}}
                  hintText="last name"
                  floatingLabelText="last name"
                  value={this.state.lastName}
                /><br />
                <TextField
                  onChange={(e, newValue) => {this.setStore({email:newValue})}}
                  hintText="email"
                  floatingLabelText="email"
                  value={this.state.email}
                /><br />
                <TextField
                  onChange={(e, newValue) => {this.setStore({password: newValue})}}
                  hintText="password"
                  floatingLabelText="password"
                  type="password"
                  value={this.state.password}
                  // errorText={this.state.password === this.state.verifyPassword ? '' : "Passwords do not match"}
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
      </div>
    );
  }
}
