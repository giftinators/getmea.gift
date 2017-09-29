import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  RaisedButton,
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
} from 'material-ui/Toolbar';

import AddItem from './AddItem';
import AddList from './AddList';

import Share from './Share';
// end of wishlist menu imports

import axios from 'axios';

const style = {
  raisedButton: {
    float: 'right',
    marginTop: 20,
    marginRight: 10,
    marginBottom: 5
  },
  listStyle: {
    marginLeft: 200,
    paddingLeft: 200,
    width: '100%'
  },
  paperStyle: {
    width: '100%',
    height: '100%'
  },
  dividerStyle: {
    width: '100%',
    marginLeft: 0,
    paddingLeft: 0
  },
  titleStyle: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 15,
    color: 'white',
    backgroundColor: '#3D5AFE',
    paddingBottom: 30,
    height: '100%'
  },
  backgroundStyle: {
    backgroundColor: '#eaf2ff',
    height: '110%',
    paddingBottom: 40

  },
  imageStyle: {
    height: 200,
  },
  gridStyles: {
    textAlign: 'center',
    minWidth: '100%',
    width: '100%'
  },
  images: {
    height: 120
  }
};

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

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      currentList: null,
      listName: 'Public List',
      menuName: 'Make List Private',
      open: false,
      modalState: false,
    }
  }

  componentWillMount() {
    this.getUserData();
  }

  handleClose() {
    this.setState({
      open: false
    });
  }

  handleOpen() {
    this.setState({
      open: true
    });
  }

    // toggles list from private to public
  toggleListType() {
    var list = this.state.listName
    if (list === 'Public List') {
      this.setState({
        listName: 'Private List',
        menuName: 'Make List Public'
      })
    } else {
      this.setState({
        listName: 'Public List',
        menuName: 'Make List Private'
      })
    }
  }

  // API call to fetch user data
  getUserData() {
    //get the username from the url
    var username = this.props.match.params.username;
    //get the list_id from the url
    var list_id = this.props.match.params.list_id;
    var currentList;

    //fetch the data of the username
    axios("/api/users/"+username)
    .then((res)=>{
      console.log(res);
      return res.data;
    })
    .then((res)=>{
      console.log(res);
      //if a list was requested try to find that list
      if (list_id){
        //find the specific list and set it to currentList
        currentList = res.wishlists.filter((list) => {
          return list._id == list_id;
        })[0];
      } else {
        //if no list is specified just set currentList the first wishlist
        currentList = res.wishlists[0];
      }

      //if the requested list isn't found then redirect back to user
      if (list_id && !currentList){
        this.props.history.push('/'+username)
      } else if (currentList) {
        //update the state
        this.setState({
          userData: res,
          currentList: currentList
        });
      }

    })
    .catch((err) => {
      console.log(err);
    })
  }

  handleModalOpen() {
    this.handleClose()
    this.setState({modalState: true});
  }

  renderMessages() {
    //changed just now
    if (this.state.currentList){
      var username = this.props.match.params.username;
      var list_id = this.state.currentList._id;

      if (this.state.currentList.items && this.state.currentList.items.length > 0) {
        return (
          this.state.userData.wishlists.map((name, index) =>{
            return (
              <Link key={'item'+index} to={'/'+username+'/'+list_id}><MenuItem key={'item'+index} style={{borderBottom: '1px solid silver'}} primaryText={this.state.userData.wishlists[index].title} onClick={ ()=>{
                this.setState({ currentList: this.state.userData.wishlists[index] })
              }} /></Link>
            )})
          )
      } else {
        return (
          <h1>No Items</h1>
        )
      }
    }
  }

  handleModalClose() {
    this.setState({modalState: false });
  }


  render() {
    return (
      this.state.currentList && <div className="container" style={style.backgroundStyle}>
        { /* Displays the AddItem button only if currentList belongs to currentUser */
          this.props.currentUser._id === this.state.currentList.user_id
          ? ( <AddItem list={this.state.currentList} getdata={this.getUserData.bind(this)}/> )
          : null
        }

        <div className="wishlistContainer" style={{maxWidth: '65%', margin: 'auto', textAlign: 'center'}} >

          <div id="topButtons" style={{marginTop: 0}}>
            <AddList list={this.state.currentList} getdata={this.getUserData.bind(this)}/>

            <Share user={this.props.currentUser} list={this.state.currentList}/>
          </div>
          <div>
            <Toolbar style={{width: '100%', backgroundColor: this.props.muiTheme.palette.primary1Color, color: 'white'}}>
              <ToolbarGroup style={{fontSize: 30}} >
                {this.state.currentList.title}
              </ToolbarGroup>
              <ToolbarGroup>
                <ToolbarTitle style={{color: 'white', fontSize: 15}} text={this.state.listName} />
                <FontIcon className="muidocs-icon-custom-sort" />
                <ToolbarSeparator />
                <IconMenu iconButtonElement={
                  <IconButton>
                    <NavigationExpandMoreIcon />
                  </IconButton>
                }>
                  <MenuItem onClick={()=>{this.toggleListType()}} primaryText={this.state.menuName} />
                  <MenuItem style={{borderBottom: '1px solid silver'}} primaryText="Delete List" />
                  {this.renderMessages()}

                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
          </div>
          <div className="paperContainer">
            <Paper zDepth={2}>
              <Table>
                <TableBody
                  displayRowCheckbox={false}
                >
                  {
                    this.state.currentList && this.state.currentList.items && this.state.currentList.items.map((row, index) => (
                      <TableRow hoverable={true} key={index}>
                        <TableRowColumn style={{fontSize: 18, width: '25%'}}>{row.title}</TableRowColumn>
                        <TableRowColumn  style={{fontSize: 18}}>${row.price}</TableRowColumn>
                        <TableRowColumn style={{color: 'white'}} >
                          <div>
                            <Dialog
                              actions={this.state.actions}
                              modal={false}
                              open={this.state.open}
                              onRequestClose={this.handleClose}>

                              <p style={{color: 'black'}}>{row.title}</p>
                              <p style={{color: 'black'}}>Price: ${row.price}</p>
                              <p style={{color: 'black'}}>Comments from {this.state.userData.username[0].toUpperCase()+''+this.state.userData.username.slice(1)}: {row.comments}</p>
                              <Paper style ={{maxHeight: 290, maxWidth: 290}}><img alt ='' style={{maxHeight: 290, maxWidth: 290}} src={row.image_url}/></Paper>
                              <p style={{fontSize: 15, color: 'black'}}>Link to product: <a style={{height: 20, textDecoration: 'none',  color: 'white', backgroundColor: this.state.secondaryColor, border: '1px solid #d8e7ff', padding: 1, fontSize: 14, borderRadius: '10%'}} href={row.url} target="_blank">Click Here</a></p>
                              <h3 style={{textAlign: 'right', marginTop: -50}}>Will you get this gift?</h3>

                              </Dialog>

                              <Dialog
                              actions={modalActions}
                              modal={true}
                              open={this.state.modalState}>
                              <h2><img alt="" style={{height: 20, width: 20}} src="http://www.iconsdb.com/icons/preview/dark-gray/high-importance-xxl.png" /> Are you sure you are going to get this gift?</h2>
                              If you claim this gift, it will disappear. And nobody else will be able to get this for {this.state.userData.username[0].toUpperCase()+this.state.userData.username.slice(1)}.
                            </Dialog>

                            <RaisedButton secondary={true} label="Get Gift" onClick={this.handleOpen.bind(this)} />
                          </div>
                        </TableRowColumn>

                        <TableRowColumn hoverable={true} style={{ height: 140}}>
                          <Paper style={{marginTop: 10, maxHeight: 120}} zDepth={1} >
                            <img style={style.images} src={row.image_url}/>
                          </Paper>
                        </TableRowColumn>
                      </TableRow>
                    ))
        `         }
                </TableBody>
              </Table>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default muiThemeable()(WishListPage);
