import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Dropzone from 'react-dropzone';


/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class AddItem extends Component {
  state = {
    open: false,
    title: '',
    price: 0.00,
    url: '',
    imageUrl: '',
    comments: '',
    errorTextPrice: '*Required',
    errorTextTitle: '*Required'
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({
      errorTextPrice: '*Required',
      errorTextTitle: '*Required',
      open: false
    });
  };

  handleTitleChange = (e, newValue) => {
    if(newValue) {
      this.setState({
        errorTextTitle: ''
      })
    }

    this.setState({title: newValue})
  }
  handlePriceChange = (e, newValue) => {
    if(isNaN(newValue)) {
      this.setState({
        errorTextPrice: 'Number Only'
      })
    } else {
      this.setState({
        errorTextPrice: ''
      })
      this.setState({price: newValue})
    }
  }
  handleUrlChange = (e, newValue) => {
    this.setState({url: newValue})
  }
  handleCommentChange = (e, newValue) => {
    this.setState({comments: newValue})
  }

  //figure out how to add an upload image button
  handleImageUrlChange = (e, newValue) => {
    this.setState({imageUrl: newValue})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/items', {
      title: this.state.title,
      price: this.state.price,
      url: this.state.url,
      imageUrl: this.state.imageUrl,
      comments: this.state.comments

    })
    .then((response) => {
      if (response.data) {
        console.log(response);
        this.setState({open: false});
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  //trying to edit so that errortext goes away when they type something
  handleErrorText = (e) => {
    console.log(e.target.value)
    if(e.target.value.length) {
      this.setState({errorText: ''});
    } else {
      this.setState({errorText: '*Required'});
    }
  }

  dropHandler = (file) => {
    var photo = new FormData();
    photo.append('photo', file[0]);
    axios.post('/upload', photo, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
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
        disabled={!this.state.title || !this.state.price}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton secondary label="+" onClick={this.handleOpen}  style={{float: 'right',
            marginRight: 10,
            marginBottom: 5}}/>
        <Dialog
          title={Header()}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{marginLeft: 150}}>
            <form>
              <div>
                <TextField
                  onChange={this.handleTitleChange}
                  floatingLabelText="Item Name"
                  type="title"
                  value={this.state.title}
                  errorText={this.state.errorTextTitle}
                  style={{marginRight: 30}}
                />
                <TextField
                onChange={this.handlePriceChange}
                floatingLabelText="Price"
                type="price"
                value={this.state.price}
                errorText={this.state.errorTextPrice}
                style={{maxWidth: 100}}
                />
              </div>
              <br />
              <div>
                <TextField
                  onChange={this.handleUrlChange}
                  floatingLabelText="Link to Item"
                  type="url"
                  value={this.state.url}
                />
              </div>
              <div>
                <TextField
                onChange={this.handleImageUrlChange}
                floatingLabelText="Image Url"
                type="imageUrl"
                value={this.state.imageUrl}
                style={{marginRight: 20}}
                />
                <Dropzone disableClick={false} multiple={false} accept={'image/*'} onDrop={this.dropHandler} style={{maxHeight: 50, maxWidth: 150}}>
                  <FlatButton secondary label="Upload Photo"></FlatButton>
                </Dropzone>
              </div>
              <div>
              </div>
              <div>
                <TextField
                  onChange={this.handleCommentChange}
                  floatingLabelText="Description"
                  hintText="Additional Comments (color, model, size, etc)"
                  type="comments"
                  rows={2}
                  multiLine={true}
                  value={this.state.comments}
                  style={{textAlign: 'left'}}
                />
              </div>
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const Header = () => (
  <div style={{textAlign: 'center'}}> Add Item </div>
)
