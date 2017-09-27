import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';

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
    errorText: '*Required'
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleTitleChange = (e, newValue) => {
    this.setState({title: newValue})
  }
  handlePriceChange = (e, newValue) => {
    this.setState({price: newValue})
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

  //trying to edit so that errortext goes away when they type something
  handleErrorText = (e) => {
    console.log(e.target.value)
    if(e.target.value.length) {
      this.setState({errorText: ''});
    } else {
      this.setState({errorText: '*Required'});
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
                  errorText={this.state.errorText}
                  style={{marginRight: 30}}
                />
                <TextField
                onChange={this.handlePriceChange}
                floatingLabelText="Price"
                type="price"
                value={this.state.price}
                errorText={this.state.errorText}
                style={{maxWidth: 75}}
                />
              </div>
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
                <FlatButton
                  secondary
                  label='Upload Image'
                  />
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
