import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';


export default class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: ''
    };


  }

  render () {

        const findUserActions = [
          <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.props.close}
          />
        ];

    var settingsPage = (
        <div className="settings" style={{maxWidth: '20%'}}>
          <Dialog
            title="My Information"
            actions={findUserActions}
            modal={true}
            open={this.props.appState.optionsShow}
          >
            <Divider />
            <div className="optionsContainer" style={{display:"flex", flexDirection:"row"}}>
              <div className="leftOptions" style={{flex: 3 }}>
                <p>Username: {this.props.appState.currentUser.username}</p>
                <p>Name: {this.props.appState.currentUser.firstName + ' ' + this.props.appState.currentUser.lastName}</p>
                <p>Email: {this.props.appState.currentUser.email}</p>
                <button>Change Password</button>
              </div>
            <div className="rightOptions" style={{flex: 2}}>
              <Paper style={{marginTop: 10, maxHeight: 150, textAlign:'center'}} zDepth={1} >
                <img alt={''} style={{maxHeight: 150, maxWidth: '100%'}} src="http://res.cloudinary.com/getmeagiftlegacy/image/upload/v1510851221/most_normal_picture_m7n8rs.jpg"/>
              </Paper>
              <p>Add/Edit phot</p>
              <p>Upload div here</p>
            </div>
          </div>
          </Dialog>
        </div>
      )

    if (this.props.appState.optionsShow){
      return (
        <div>
        {settingsPage}
        </div>
      )
    } else {
      return (null)
    }
  }
}
