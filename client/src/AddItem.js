import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import Signup from './Signup.js';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

const styles = {
  block: {
    maxWidth: 100,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  checkbox: {
    marginBottom: 16,
  },
};

export default class Login extends Component {
  state = {
    open: false,
    title: '',
    price: null,
    url: '',
    imageUrl: '',
    comments: '',
    private: false,
    checked: false
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
  handleImageChange = (e, newValue) => {
  }

  updateCheck() {
    this.setState((oldState) => {
      return {
        checked: !oldState.checked,
      };
    });
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
              /><br />
              <TextField
                onChange={this.handlePriceChange}
                floatingLabelText="Price"
                type="price"
                value={this.state.price}
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
                onChange={this.handleCommentChange}
                floatingLabelText="Description"
                type="comments"
                multiLine={true}
                rows={2}
                value={this.state.comments}
                styles={{textAlign: 'left'}}
              />
              </div>
              <br />
              <FlatButton secondary label='Upload Image'/>
              <br />
              <div style={styles.block}>
              <Checkbox
                label="Private"
                checked={this.state.checked}
                onCheck={this.updateCheck.bind(this)}
                styles={styles.checkbox}
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
  // <div>Login or <Signup /></div>
)
