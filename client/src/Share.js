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
<<<<<<< HEAD
=======
      value: window.location.origin+'/'+this.props.user.username+'/'+this.props.list._id,
>>>>>>> share btn
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
        onClick={this.handleClose}
      />,
    ];

    //sets the value of the text needed to be copied to the current location
<<<<<<< HEAD
    const value = window.location.href;
=======
    const value = window.location.origin+'/'+this.props.user.username+'/'+this.props.list._id;
>>>>>>> share btn

    return (
      <div>
        <RaisedButton secondary label="Share" onClick={this.handleOpen}  style={{float: 'right',
            marginTop: 20,
            marginRight: 10,
        marginBottom: 5}}/>
        <Dialog
          title="Share This List"
          actions={actions}
          modal={true}
          open={this.state.open}
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
<<<<<<< HEAD

=======
            
>>>>>>> share btn
            {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
          </div>
        </Dialog>
      </div>
    );
  }
}
