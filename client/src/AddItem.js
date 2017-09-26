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
    title: '',
    price: null,
    url: '',
    imageUrl: '',
    comments: '',
    private: false
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
        disabled={!this.state.title || !this.state.password}
        onClick={this.handleClose}
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
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                onChange={this.handleTitleChange}
                floatingLabelText="Item Name"
                type="title"
                value={this.state.title}
                errorText="Item Name is Required"
              /><br />
              <TextField
                onChange={this.handlePriceChange}
                floatingLabelText="Price"
                type="price"
                value={this.state.price}
                errorText="Price is Required"
                style={{maxWidth: 75}}
              /><br />
              <TextField
                onChange={this.handleUrlChange}
                floatingLabelText="Link to Item"
                type="url"
                value={this.state.url}
              />
              <div>
                <TextField
                onChange={this.handleImageUrlChange}
                floatingLabelText="Image Url"
                type="imageUrl"
                value={this.state.imageUrl}
                />
              </div>
              <div>
                <TextField
                  onChange={this.handleCommentChange}
                  floatingLabelText="Description"
                  type="comments"
                  rows={2}
                  multiLine='true'
                  value={this.state.comments}
                  style={{textAlign: 'left'}}
                />
              </div>
              <div>
                <FlatButton secondary label='Upload Image'/>
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
