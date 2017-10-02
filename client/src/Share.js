import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';


/* https://www.npmjs.com/package/react-copy-to-clipboard */
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Share extends Component {
  constructor (props) {
    super(props);

    this.state = {
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

    this.handleCopied = () => {
      this.setState({
        copied: true
      });

      //shows the 'copied' text for only 5 seconds
      setTimeout(() => {
        this.setState({
          copied: false
        })
      }, 5000);
    }
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
        onClick={this.props.handleClose}
      />,
    ];

    //sets the value of the text needed to be copied to the current location
    const value = window.location.href;

    return (
        <Dialog
          title="Share This List"
          actions={actions}
          modal={true}
          open={this.props.open}
          onRequestClose={this.props.onRequestClose}
        >
          <div>
            <TextField value={value}
              name="url"
              hintText=""
              onChange={() => this.setState({copied: false})}
              style={{width: 300, marginRight: 50}}
            />

            <CopyToClipboard text={value}
              onCopy={() => this.handleCopied() }>
              <RaisedButton primary label="Copy to clipboard" style={{marginRight: 25}}></RaisedButton>
            </CopyToClipboard>
            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>
        </Dialog>
    );
  }
}
