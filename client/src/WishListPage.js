import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {
  Table,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import IconMenu from 'material-ui/IconMenu';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Divider from 'material-ui/Divider';
import Delete from 'material-ui/svg-icons/action/delete';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import AddCircle from 'material-ui/svg-icons/content/add-circle';

import AddItem from './AddItem';
import AddList from './AddList';
import BuyGiftModal from './BuyGiftModal';
import Share from './Share';

import axios from 'axios';

const style = {
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
    maxHeight: 120,
    maxWidth: '100%'
  }
};

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: null,
      currentList: null,
      listName: 'Public List',
      menuName: 'Make List Private',
      open: false,
      modalState: false
    }
  }

  componentDidMount() {
    this.getUserData();
  }

    // toggles list from private to public
  toggleListType() {
    axios.put('/api/lists/'+this.state.currentList._id, {
      secret: !this.state.currentList.secret
    }).then((res) => {
      this.setState({
        currentList: res.data
      })
    })
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
      return res.data;
    })
    .then((res)=>{
      //if a list was requested try to find that list
      if (list_id){
        //find the specific list and set it to currentList
        currentList = res.wishlists.filter((list) => {
          return list._id === list_id;
        })[0];

        //if the requested list isn't found then redirect back to user
        if (!currentList) {
          this.props.history.push('/'+username)
        }
      } else {
        //if no list is specified just set currentList the first wishlist
        currentList = res.wishlists[0];
      }

      if (currentList) {
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

  renderMessages() {
    //changed just now
    if (this.state.currentList) {
      var username = this.props.match.params.username;

      if (this.state.currentList.items && this.state.currentList.items.length >= 0) {
        return (
          this.state.userData.wishlists.map((list, index) => {
            return (
              <MenuItem
                key={index}
                style={{borderBottom: '1px solid silver'}}
                primaryText={list.title}
                onClick={ () => {
                  this.props.history.push('/'+username+'/'+list._id);
                  this.setState({currentList: list});
                }} />
            )})
          )
      }
    }
  }

  render() {
    const topRightMenu = (
      this.state.currentList &&
      <IconMenu iconButtonElement={
        <IconButton>
          <NavigationExpandMoreIcon />
        </IconButton>
      }>

        {isListOwner && <MenuItem rightIcon={this.state.currentList.secret ? <LockOpen /> : <Lock />} onClick={()=>{this.toggleListType()}} primaryText={this.state.currentList.secret ? 'Make List Public' : 'Make List Private'} /> }
        {isListOwner && <MenuItem primaryText="Delete List" rightIcon={<Delete />} onClick={this.handleDeleteOpen.bind(this)} /> }
        {isListOwner && !this.state.currentList.secret && <MenuItem primaryText="Share" rightIcon={<PersonAdd />} /> }
        {isListOwner && <MenuItem primaryText="Create New List" rightIcon={<AddCircle />} /> }
        {isListOwner && <Divider /> }

        {this.renderMessages()}
      </IconMenu>
    );

    return (
      this.state.currentList && <div className="container" style={style.backgroundStyle}>

        { /* Displays the AddItem button only if currentList belongs to currentUser */
          this.props.currentUser._id === this.state.currentList.user_id
            ? ( <AddItem list={this.state.currentList} getdata={this.getUserData.bind(this)}/> )
            : null
        }

        <div className="wishlistContainer" style={{maxWidth: '65%', margin: 'auto', textAlign: 'center'}} >

          <div id="topButtons" style={{marginTop: 0}}>

            <AddList list={this.state.currentList} goToList={this.goToList.bind(this)} getdata={this.getUserData.bind(this)}/>
            { !this.state.currentList.secret && <Share style={{topMargin: 20}} user={this.props.currentUser} list={this.state.currentList}/> }

          </div>

          <div>
            <AppBar title={(
              <div>
                {this.state.currentList.title.toUpperCase()}
              </div>
            )}
              style={{color: 'white'}}
              iconElementRight={topRightMenu}
              iconElementLeft={
                this.state.currentList.secret
                ? (<Lock style={{padding: 12, color: 'white'}}/>)
                : (<LockOpen style={{padding: 12, color: 'white', alt: 'Public List'}} />)
              }
            >
            </AppBar>
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
                            <BuyGiftModal item={row} index={index} userData={this.props}/>
                          </div>
                        </TableRowColumn>
                        <TableRowColumn hoverable={true} style={{ height: 140}}>
                          {
                            row.image_url && <Paper style={{marginTop: 10, maxHeight: 120, textAlign:'center'}} zDepth={1} >
                              <img alt={''} style={style.images} src={row.image_url}/>
                            </Paper>
                          }
                        </TableRowColumn>
                      </TableRow>
                    ))
                 }
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
