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

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      username: '',
      password: '',
      verifyPassword: ''
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };
    this.handleEmailChange = (e, newValue) => {
      this.setState({username: newValue})
    };
    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    };
    this.handleVerifyPasswordChange = (e, newValue) => {
      this.setState({verifyPassword: newValue})
    };
    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log('username:', this.state.username, 'pass:', this.state.password)
      axios.post('api/signup', {
        username: this.state.username,
        password: this.state.password
      })
      .then((response) => {
        console.log(response);
        this.setState({open: false});
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
                errorText="Passwords don't match"
              /><br />
            </form>
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
          </div>
        </Dialog>
      </div>
    );
  }
}
