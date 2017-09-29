import React, { Component } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';



/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Share extends Component {
  constructor (props) {
    super(props);

    this.state = {
      //sets the value of the text needed to be copied to the current location
      value: window.location.origin+'/'+this.props.user.username+'/'+this.props.list._id,
      copied: false,
      open: false
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({
        errorTextTitle: '*Required',
        open: false
      });
    };
  }

  getInitialState() {
    return {value: '', copied: false};
  }


  render() {
    const actions = [
      <FlatButton
        type="button"
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton secondary label="Share" onClick={this.handleOpen}  style={{float: 'right',
            marginRight: 10,
            marginBottom: 5}}/>
        <Dialog
          title="Share This List"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          <div>
              <TextField value={this.state.value}
                name="url"
                hintText=""
                onChange={({target: {value}}) => this.setState({value, copied: false})}
                style={{width: 300, marginRight: 50}}
                />

              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                <span></span>
              </CopyToClipboard>

              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                <RaisedButton primary label="Copy to clipboard" style={{marginRight: 25}}></RaisedButton>
              </CopyToClipboard>

              {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
            </div>
        </Dialog>
      </div>
    );
  }
}
