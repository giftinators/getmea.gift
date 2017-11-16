import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/
const style = {
  RightBtns: {
      marginTop: 5,
      marginRight: 5
    },
}
export default class FindUserButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      register: false,
      input: '',
      radioButton: 'name'
    };



    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({open: false});
    };
/*
    this.toggleRegister = () => {
      this.setState({register: !this.state.register})
    };
*/

    this.handleInputChange = (e, newValue) => {
      this.setState({input: newValue})
    };

    this.handleSearch = (e) => {
      e.preventDefault;
      console.log('in handleSearch')
    }

    this.handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.handleSearch(e);
      }
    }

    this.handleRadioSwitch = (e, label) => {
      this.setState({radioButton: label})
    }
/*
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
          if (this.props.history.location.pathname === '/'){
            this.props.history.push('/'+this.state.username)
          }
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

*/

}

  render() {


    const findUserActions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    const hintText = {
      name: 'ex: John Smith',
      username: 'ex: jSmith45',
      email: 'ex: jBaller45@hotmail.com'
    }


    var findUserForm = (
        <div className="findUser">
          <Dialog
            title="Search for Users by Name, Username, or email."
            actions={findUserActions}
            modal={true}
            open={this.state.open}
          >
            <div>
            <RadioButtonGroup name="status" defaultSelected="name" onChange={(e, value) => {this.handleRadioSwitch(e, value)}}>
            <RadioButton style={{ display: 'inline-block', width: '100px' }} label="name" value="name" />
            <RadioButton style={{ display: 'inline-block', width: '100px', marginLeft: '50px' }} label="username" value="username" />
            <RadioButton style={{ display: 'inline-block', width: '100px', marginLeft: '50px' }} label="email" value="email" />

            </RadioButtonGroup>
            </div>
            <div style={{textAlign: 'center'}}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  onKeyPress={this.handleKeyPress}
                  onChange={this.handleInputChange}
                  hintText={hintText[this.state.radioButton]}
                  floatingLabelText={this.state.radioButton}
                  value={this.state.input}
                />
              </form>
            </div>
          </Dialog>
        </div>
    )

    if (this.state.open){
      return findUserForm
    } else {
      return (
        <div className="findUser">
          <RaisedButton className="findUserBtn" secondary label="Find User" onClick={() => {this.handleOpen()}} />
        </div>
      )
    }
  }
}
