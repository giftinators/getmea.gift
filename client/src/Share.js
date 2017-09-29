import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CopyToClipboard from 'react-copy-to-clipboard';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';


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
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({
        errorTextTitle: '*Required',
        open: false
      });
    };

    this.handleTitleChange = (e, newValue) => {
      if(newValue) {
        this.setState({
          errorTextTitle: ''
        })
      }

      this.setState({title: newValue})
    }

    this.updateCheck = function(){
      this.setState((oldState) => {
        return {
          secret: !oldState.secret
        };
      });
    }


    this.handleSubmit = (e) => {
      e.preventDefault();
      console.log('props in addlist ', this.props)
      console.log(this.state)
      axios.post('/api/lists', {
        title: this.state.title,
        secret: this.state.secret
      })
      .then((response) => {
        console.log('response: ', response);
        if (response.data) {
          this.setState({open: false});
          //rerender WishListPage
          this.props.getdata()
        }
      })
      .catch(function (error) {
        console.log('handlesubmit ', error.response);
      });
    };

    //Shows error text and removes it when a value is input
    this.handleErrorText = (e) => {
      console.log(e.target.value)
      if(e.target.value.length) {
        this.setState({errorText: ''});
      } else {
        this.setState({errorText: '*Required'});
      }
    }
  }


  render() {
    const actions = [
      <FlatButton
        type="button"
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        type="Submit"
        label="Submit"
        primary={true}
        disabled={!this.state.title}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div>
        <RaisedButton secondary label="New WishList" onClick={this.handleOpen}  style={{float: 'right',
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
                <TextField
                  onChange={this.handleTitleChange}
                  floatingLabelText="List Name"
                  type="title"
                  value={this.state.title}
                  errorText={this.state.errorTextTitle}
                  style={{marginRight: 30}}
                /><br />
                <Checkbox
                  label="Secret"
                  checked={this.state.secret}
                  onCheck={this.updateCheck.bind(this)}
                  style={styles.checkbox}
                />
            </form>
          </div>
        </Dialog>
      </div>
    );
  }
}

const Header = () => (
  <div style={{textAlign: 'center'}}> Add List </div>
)
