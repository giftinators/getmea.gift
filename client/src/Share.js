import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';


/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class Share extends Component {
  constructor (props) {
    super(props);

    this.state = {
      value: '',
      copied: false
    };

    this.handleOpen = () => {
      console.log(this.props)
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
        label="Cancel"
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
              <input value={this.state.value}
                onChange={({target: {value}}) => this.setState({value, copied: false})} />

              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                <span></span>
              </CopyToClipboard>

              <CopyToClipboard text={this.state.value}
                onCopy={() => this.setState({copied: true})}>
                <button>Copy to clipboard with button</button>
              </CopyToClipboard>

              {this.state.copied ? <span style={{color: 'red'}}>Copied.</span> : null}
            </div>
        </Dialog>
      </div>
    );
  }
}
