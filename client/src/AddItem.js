import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class AddItem extends Component {
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
        label="Add Item"
        primary={true}
        disabled={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Add Item" onClick={this.handleOpen} />
        <Dialog style={{textAlign: 'center', width: '80%'}}
          title={<Title />}
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div style={{textAlign: 'center'}}>
            <form>
              <TextField
                hintText="Item Name"
                floatingLabelText="Item Name"
                errorText="Name of Item Required"
              />
              <TextField style={{width: 100, paddingLeft: 50}}
                hintText="Price"
                floatingLabelText="Price"
              /><br />
              <TextField
                hintText="Url"
                floatingLabelText="Url"
                type="password"
              /><br />
              <TextField
                hintText="Comments"
                floatingLabelText="Comments"
                type="password"
              /><br />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const Title = () => (
  <span>Add Item</span>
)
