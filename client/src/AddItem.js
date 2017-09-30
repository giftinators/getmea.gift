import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import DropzoneComponent from 'react-dropzone-component'


/**
* A modal dialog can only be closed by selecting one of the actions.
*/

export default class AddItem extends Component {
  constructor (props) {
    super(props);

    this.state = {
      open: false,
      title: '',
      price: 0.00,
      url: '',
      imageUrl: '',
      comments: '',
      errorTextPrice: '*Required',
      errorTextTitle: '*Required'
    };

    this.handleOpen = () => {
      this.setState({open: true});
    };

    this.handleClose = () => {
      this.setState({
        errorTextPrice: '*Required',
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

    //sets price in state and make sure user only enters a number
    this.handlePriceChange = (e, newValue) => {
      if(isNaN(newValue)) {
        this.setState({
          errorTextPrice: 'Number Only'
        })
      } else {
        this.setState({
          errorTextPrice: ''
        })
        if(newValue.toString().length < 10){
          this.setState({price: newValue})
        }
      }
    }

    this.handleUrlChange = (e, newValue) => {
      this.setState({url: newValue})
    }

    this.handleCommentChange = (e, newValue) => {
      this.setState({comments: newValue})
    }

    //figure out how to add an upload image button

    this.handleImageUrlChange = (e, newValue) => {
      this.setState({imageUrl: newValue})
    }

    this.handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/api/items', {
        title: this.state.title,
        price: this.state.price,
        url: this.state.url,
        image_url: this.state.imageUrl,
        comments: this.state.comments,
        list_id: this.props.list._id,
        user_id: this.props.list.user_id
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

    // this.dropHandler = (file) => {
    //   var photo = new FormData();
    //   photo.append('photo', file[0]);
    //   axios.post('/api/upload', photo, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data'
    //       }
    //   })
    // }
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
        disabled={!this.state.title || !this.state.price}
        onClick={this.handleSubmit}
      />,
    ];

    const componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif'],
            showFiletypeIcon: true,
            postUrl: '/uploadHandler'
        };
        var djsConfig = { autoProcessQueue: false }
var eventHandlers = { addedfile: (file) => console.log(file) }

    const style = {
      margin: 0,
      top: 'auto',
      right: 30,
      bottom: 30,
      left: 'auto',
      position: 'fixed',
    };

    return (
      <div>
        <FloatingActionButton secondary onClick={this.handleOpen} style={style}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          title={Header()}
          actions={actions}
          modal={true}
          open={this.state.open}
          autoScrollBodyContent={true}
        >
          <div style={{marginLeft: 150}}>
            <form>
                <TextField
                  onChange={this.handleTitleChange}
                  floatingLabelText="Item Name"
                  type="title"
                  value={this.state.title}
                  errorText={this.state.errorTextTitle}
                  style={{marginRight: 30}}
                /><br />
                <TextField
                  onChange={this.handlePriceChange}
                  floatingLabelText="Price"
                  type="price"
                  value={this.state.price}
                  errorText={this.state.errorTextPrice}
                  style={{maxWidth: 100}}
                /><br />
                <TextField
                  onChange={this.handleUrlChange}
                  floatingLabelText="Link to Item"
                  type="url"
                  value={this.state.url}
                /><br />
                <TextField
                  onChange={this.handleImageUrlChange}
                  floatingLabelText="Image Url"
                  type="imageUrl"
                  value={this.state.imageUrl}
                  style={{marginRight: 20}}
                />
                <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
                /><br />
                <TextField
                  onChange={this.handleCommentChange}
                  floatingLabelText="Description"
                  hintText="Additional Comments (color, model, size, etc)"
                  type="comments"
                  rows={2}
                  multiLine={true}
                  value={this.state.comments}
                  style={{textAlign: 'left', width: '70%'}}
                />
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
