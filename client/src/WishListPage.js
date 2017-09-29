import React, {
  Component
}
from 'react';
import { Link } from 'react-router-dom';

// dded gridList and gridTile for grid divs. May not need all
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiThemeable from 'material-ui/styles/muiThemeable';

import {
  RaisedButton,
  Table,
  TableBody,
  TableRow,
  TableRowColumn
}
from 'material-ui';

// added for grid stuff, may not need all
import IconButton from 'material-ui/IconButton';
// end of list style MUI imports

//imports for paper
import Paper from 'material-ui/Paper';
// end of paper imports

// toolbar imports
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
  ToolbarTitle
}
from 'material-ui/Toolbar';
// end of toolbar inputs

//Component import
import AddItem from './AddItem';
import AddList from './AddList';
// end of wishlist menu imports

// Get Gift modal imports
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// end Get Gift modal imports

import axios from 'axios';

const style = {
  raisedButton: {
    float: 'right',
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

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secondaryColor: '',
      pj: '',
      modalActions: [ < FlatButton
        label = "Yes. I'm positive I will get this gift."
        primary = {
          true
        }
        onClick = {
          this.handleModalClose
        }
        />, < FlatButton
        label = "No. I'm not totally sure I will get this gift."
        primary = {
          true
        }
        onClick = {
          this.handleModalClose
        }
        />,
      ],
      userData: {
        _id: "59c9ca9d9abf99a03260e2ed",
        username: "ross",
        "__v": 12,
        wishlists: [{
          "_id": "59cacd20d5cabadddb751b65",
          title: "Christmas List",
          secret: false,
          user_id: "59c9ca9d9abf99a03260e2ed",
          __v: 1,
          items: [{
            _id: "59cacd33d5cabadddb751b66",
            title: "New Balance - 247 Classic",
            price: 79.99,
            comments: "I wear a size 10.5",
            url: "http://www.newbalance.com/pd/247-classic/MRL247-C.html?dwvar_MRL247-C_color=Navy&default=true#color=Navy&width=D",
            list_id: "59cacd20d5cabadddb751b65",
            user_id: "59c9ca9d9abf99a03260e2ed",
            __v: 0,
            purchased: false,
            timestamp: "2017-09-26T21:57:07.058Z"
          }]
        }]
      },
      currentList: {
        "_id": "59cacd20d5cabadddb751b65",
        title: "Christmas List",
        secret: false,
        user_id: "59c9ca9d9abf99a03260e2ed",
        __v: 1,
        items: [{
          _id: "59cacd33d5cabadddb751b66",
          title: "New Balance - 247 Classic",
          price: 79.99,
          comments: "I wear a size 10.5",
          url: "http://www.newbalance.com/pd/247-classic/MRL247-C.html?dwvar_MRL247-C_color=Navy&default=true#color=Navy&width=D",
          list_id: "59cacd20d5cabadddb751b65",
          user_id: "59c9ca9d9abf99a03260e2ed",
          __v: 0,
          purchased: false,
          timestamp: "2017-09-26T21:57:07.058Z"
        }]
      },
      listName: 'Public List',
      test: props.muiTheme.palette.textColor,
      menuName: 'Make List Private',
      open: false,
      modalState: false,
      actions: [ < FlatButton
        label = "Yes"
        primary = {
          true
        }
        keyboardFocused = {
          true
        }
        onClick = {
          () => {
            this.handleModalOpen()
          }
        }
        />, < FlatButton
        label = "No"
        primary = {
          true
        }
        keyboardFocused = {
          true
        }
        onClick = {
          () => {
            this.handleClose()
          }
        }
        />,
      ]

    }
    this.getUserData()
  }

  getThemeColors() {
    var element = document.getElementById("appBar");
    var tstyle=window.getComputedStyle(element,"");
    var bgColor= tstyle.getPropertyValue("background-color");
    this.setState({pj: bgColor})
    var element = document.getElementById("secondaryColor");
    // var tstyle=window.getComputedStyle(element,"");
    var bgColor= tstyle.getPropertyValue("background-color");
    this.setState({secondaryColor: bgColor})
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };


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

      var config = {
        method: 'GET',
        mode: 'no-cors'
      };

      //fetch the data of the username
      fetch("/api/users/"+username, config)
      .then((res)=>{
        return res.json()
      })
      .then((res)=>{
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
        } else {
          //update the state
          this.setState({
            userData: res,
            currentList: currentList
          });
          this.checkIfPublic()
          this.getThemeColors()
        }

      })
    }

  handleModalOpen = () => {
    this.handleClose()
    this.setState({modalState: true});
  };

  renderMessages() {
    //changed just now
    var username = this.props.match.params.username;
    var list_id = this.state.currentList._id;

      if (this.state.currentList.items.length > 0) {
        return (
          this.state.userData.wishlists.map((name, index) =>{
            return (
              <Link to={'/'+username+'/'+list_id}><MenuItem key={'item'+index} style={{borderBottom: '1px solid silver'}} primaryText={this.state.userData.wishlists[index].title} onClick={ ()=>{
              this.setState({ currentList: this.state.userData.wishlists[index] })
        }} /></Link>
      )})
        )
      } else {
        return (
          <h1>No Items Here Mother Fucker</h1>
        )
      }
  }

  handleModalClose = () => {
    this.setState({modalState: false });
  };

  // Checks if list is set to private or public
  checkIfPublic() {
    if (this.state.currentList.secret) {
      this.setState({ listName: 'Private List' })
    } else {
      this.setState({ listName: 'Public List' })
    }
    this.setState({ currentList: this.state.userData.wishlists[0] })
  }

  render() {
    return (
      <div style={style.backgroundStyle}>
        <div style={{minWidth: '100%'}} className="WishListPage">
          <div style={{width: '65%', textAlign: 'center', marginLeft: '17.0%', borderRadius: '100%'}} >
            <br/>
            <span id=''></span>
            <AddList list={this.state.currentList} getdata={this.getUserData.bind(this)}/>
            <RaisedButton  style={style.raisedButton} secondary label="Share"/>
            <AddItem list={this.state.currentList} getdata={this.getUserData.bind(this)}/>
            <br/>
            <br/>
            <div>
              <Toolbar style={{width: '100%', backgroundColor: this.props.muiTheme.palette.primary1Color, color: 'white'}}>
                <ToolbarGroup style={{fontSize: 30}} >
                  {this.state.userData.wishlists[0].title}
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
              <div>
                <FloatingActionButton secondary>
                  <ContentAdd />
                </FloatingActionButton>
              </div>
          <Table>
          <TableBody>
            <TableRow>
              <TableRowColumn>
            </TableRowColumn>
          </TableRow>
          </TableBody>
            <TableBody
              displayRowCheckbox={false}
            >
            {
                this.state.currentList.items.map((row, index) => (
                <TableRow hoverable={true} key={index}>
                  <TableRowColumn style={{fontSize: 18, width: '25%'}}>{row.title}</TableRowColumn>
                  <TableRowColumn  style={{fontSize: 18}}>${row.price}</TableRowColumn>
                  <TableRowColumn style={{color: 'white'}} >          <div>
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
                    actions={this.state.modalActions}
                    modal={true}
                    open={this.state.modalState}>
                    <h2><img alt="" style={{height: 20, width: 20}} src="http://www.iconsdb.com/icons/preview/dark-gray/high-importance-xxl.png" /> Are you sure you are going to get this gift?</h2>
                    If you claim this gift, it will disappear. And nobody else will be able to get this for {this.state.userData.username[0].toUpperCase()+this.state.userData.username.slice(1)}.
                  </Dialog>

                  <RaisedButton secondary={true} label="Get Gift" onClick={this.handleOpen} />
                  </div></TableRowColumn>

                  <TableRowColumn hoverable={true} style={{ height: 140}}>
                    <Paper style={{marginTop: 10, maxHeight: 120}} zDepth={1} >
                      <img alt="button" style={style.images} src={row.image_url}/>
                    </Paper>
                  </TableRowColumn>
                  </TableRow>
                ))}

                </TableBody>
              </Table>
            </div>
           </div>
         </div>
       </div>
    );
  }
}


export default muiThemeable()(WishListPage);
