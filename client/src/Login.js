import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Login extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onClick={this.handleOpen} />
        <Dialog
          title={<CreateAccountLink />}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                hintText="Username"
                floatingLabelText="Username"
              /><br />
              <TextField
                hintText="Password"
                floatingLabelText="Password"
                type="password"
              /><br />
              <TextField
                hintText="Confirm Password"
                floatingLabelText="Confirm Password"
                type="password"
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
  <span>Login or Create Account</span>
)
