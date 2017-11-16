import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import Dropzone from 'react-dropzone';

export default class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      emailInput: '',
      fileReceived: false,
      fileName: '',
      files: null,
    };

    this.uploadFile = () => {
      const files = this.state.files;

      //if the user has added a file
      if (files) {
        /* map over all of the images, upload them, and post them to db
        (right now there is only 1 image, but can be
        changed later to accept and render multiple images) */
        files.map(file => {
          // Initial FormData
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", `getmeagift`);
          formData.append("upload_preset", "n5n2w26w"); //preset is with account
          formData.append("api_key", "365845311351591"); //key is based on account
          formData.append("timestamp", (Date.now() / 1000) | 0);

          // Make an AJAX upload request using Axios
          // The url is provided by cloudinary
          return axios.post("https://api.cloudinary.com/v1_1/getmeagiftlegacy/image/upload", formData, {
            headers: { "X-Requested-With": "XMLHttpRequest" },
          })
          .then(response => {
            const data = response.data;
            //url of image in cloudinary
            console.log(data);
            const fileURL = data.secure_url
            console.log(fileURL);
            //set the state to the new url
          /*  this.setState({
              imageUrl: fileURL
            })
*/
          //Now that the imageUrl is ready, post the item to the database
        //  this.post();
          })
        });
      } else {
        //if they don't have a file ready to be uploaded just post to database
      //  this.post()
      }
    }

    this.onDrop = (files) => {
      if(files) {
        this.setState({
          fileReceived: true,
          fileName: files[0].name,
          files: files
        });
    }
  }
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
            actions={findUserActions}
            modal={true}
            open={this.props.appState.optionsShow}
            contentStyle={{maxWidth: "500px"}}
          >
            <Divider />
            <div className="optionsContainer" style={{display:"flex", flexDirection:"row"}}>
              <div className="leftOptions" style={{flex: 3 }}>
                <h2>My Information</h2>
                <p>Username: {this.props.appState.currentUser.username}</p>
                <p>Name: {this.props.appState.currentUser.firstName + ' ' + this.props.appState.currentUser.lastName}</p>
                <p>Email: {this.props.appState.currentUser.email}</p>
                <FlatButton label="Change email" primary={true}/>
                <FlatButton label="Change Password" primary={true}/>
              </div>
            <div className="rightOptions" style={{flex: 2}}>
              <Paper style={{marginTop: 10, maxHeight: 180, textAlign:'center', maxWidth: 140}} zDepth={1} >
                <img alt={''} style={{maxHeight: 180, maxWidth: '100%', minWidth:"100%"}} src="http://res.cloudinary.com/getmeagiftlegacy/image/upload/v1510851221/most_normal_picture_m7n8rs.jpg"/>
              </Paper>
              <Dropzone disableClick={false} multiple={false} accept={'image/*'} onDrop={this.onDrop} style={{maxHeight: 50, maxWidth: 150}}>
                <FlatButton secondary label="Add New Photo"></FlatButton>
              </Dropzone>
              {this.state.fileReceived ? <span style={{color: 'blue', width: 150}}>{this.state.fileName}</span> : null}
            </div>
          </div>
          </Dialog>
        </div>
      )

    if (this.props.appState.optionsShow){
      return (
        <div className="settingOuterDiv">
        {settingsPage}
        </div>
      )
    } else {
      return (null)
    }
  }
}
