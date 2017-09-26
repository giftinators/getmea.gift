import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      open: this.props.open,
      email: '',
      password: '',
      verifyPassword: ''
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({open: false});
    };

    this.handleEmailChange = (e, newValue) => {
      this.setState({email: newValue})
    }
    this.handlePasswordChange = (e, newValue) => {
      this.setState({password: newValue})
    }
    this.handleVerifyPasswordChange = (e, newValue) => {
      this.setState({verifyPassword: newValue})
    }
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
            <p>Already have an account? <Link to={'/login'}>Login</Link></p>
          </div>
        </Dialog>
      </div>
    );
  }
}

const CreateAccountLink = () => (
  <div>Login or <a href="#">Create Account</a></div>
)
