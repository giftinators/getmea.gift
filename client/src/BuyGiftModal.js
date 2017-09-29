import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';


class BuyGiftModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      modalOpen: false
    };

    this.handleClose = ()=> {
      this.setState({
        open: false
      });
    }

    this.handleOpen = ()=> {
      this.setState({
        open: true
      });
    }

    this.handleModalOpen = () => {
      this.handleClose()
      this.setState({modalOpen: true});
    }

    this.handleModalClose = () => {
      this.setState({modalOpen: false });
    }
  }

  render() {
    const actions = [ < FlatButton
      label = "Yes"
      primary = { true }
      keyboardFocused = { true }
      onClick = { () => { this.handleModalOpen() } }
      />,
      < FlatButton
      label = "No"
      primary = { true }
      keyboardFocused = { true }
      onClick = { () => { this.handleClose() } }
      />,
    ];

    const modalActions = [ < FlatButton
      label = "Yes. I'm positive I will get this gift."
      primary
      onClick = { this.handleModalClose }
      />,
      < FlatButton
      label = "No. I'm not totally sure I will get this gift."
      primary
      onClick = { this.handleModalClose }
      />
    ];

    if (this.state.open) {
      return (
        <Dialog
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >

          <p style={{color: 'black'}}>{this.props.item.title}</p>
          <p style={{color: 'black'}}>Price: ${this.props.item.price}</p>
          <p style={{color: 'black'}}>Comments from {this.props.userData.username[0].toUpperCase()+''+this.props.userData.username.slice(1)}: {this.props.item.comments}</p>
          <Paper style ={{maxHeight: 290, maxWidth: 290}}><img alt ='' style={{maxHeight: 290, maxWidth: 290}} src={this.props.item.image_url}/></Paper>
          <p style={{fontSize: 15, color: 'black'}}>Link to product: <a style={{height: 20, textDecoration: 'none',  color: 'white', backgroundColor: this.state.secondaryColor, border: '1px solid #d8e7ff', padding: 1, fontSize: 14, borderRadius: '10%'}} href={this.props.item.url} target="_blank">Click Here</a></p>
          <h3 style={{textAlign: 'right', marginTop: -50}}>Will you get this gift?</h3>

        </Dialog>
      )
    }
    if (this.state.modalOpen) {
      return (
        <Dialog
          actions={modalActions}
          modal={true}
          open={this.state.modalOpen}>
          <h2><img alt="" style={{height: 20, width: 20}} src="http://www.iconsdb.com/icons/preview/dark-gray/high-importance-xxl.png" /> Are you sure you are going to get this gift?</h2>
          If you claim this gift, it will disappear. And nobody else will be able to get this for {this.props.userData.username[0].toUpperCase()+this.props.userData.username.slice(1)}.
        </Dialog>
      )
    } else {
      return <RaisedButton secondary label="Get Gift" onClick={this.handleOpen.bind(this)} />
    }
  }
}

export default BuyGiftModal;
