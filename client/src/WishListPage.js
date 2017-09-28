import React, {Component} from 'react';
// dded gridList and gridTile for grid divs. May not need all
import {RaisedButton, Table, TableBody, TableRow, TableRowColumn} from 'material-ui';

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
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// end of toolbar inputs

//Component import
import AddItem  from './AddItem';
// end of wishlist menu imports

<<<<<<< HEAD
// Get Gift modal imports
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// end Get Gift modal imports

=======
>>>>>>> rebasing

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
    marginBottom: 20,
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
    height: 120,
    maxWidth: 120
  }
};

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalActions: [
           <FlatButton
             label="Yes. I'm positive I will get this gift."
             primary={true}
             onClick={this.handleModalClose}
           />,
           <FlatButton
             label="No. I'm not totally sure I will get this gift."
             primary={true}
             onClick={this.handleModalClose}
           />,
         ],
    userData: {
    _id:"59c9ca9d9abf99a03260e2ed"
    ,username:"ross","__v":12
    ,wishlists:[{"_id":"59cacd20d5cabadddb751b65"
    ,title:"Christmas List"
    ,secret:false
    ,user_id:"59c9ca9d9abf99a03260e2ed"
    ,__v:1
    ,items:[{_id:"59cacd33d5cabadddb751b66"
    ,title:"New Balance - 247 Classic"
    ,price:79.99
    ,comments:"I wear a size 10.5"
    ,url:"http://www.newbalance.com/pd/247-classic/MRL247-C.html?dwvar_MRL247-C_color=Navy&default=true#color=Navy&width=D"
    ,list_id:"59cacd20d5cabadddb751b65"
    ,user_id:"59c9ca9d9abf99a03260e2ed"
    ,__v:0
    ,purchased:false
    ,timestamp:"2017-09-26T21:57:07.058Z"}]}
  ]},
    currentList: {"_id":"59cacd20d5cabadddb751b65"
    ,title:"Christmas List"
    ,secret:false
    ,user_id:"59c9ca9d9abf99a03260e2ed"
    ,__v:1
    ,items:[{_id:"59cacd33d5cabadddb751b66"
    ,title:"New Balance - 247 Classic"
    ,price:79.99
    ,comments:"I wear a size 10.5"
    ,url:"http://www.newbalance.com/pd/247-classic/MRL247-C.html?dwvar_MRL247-C_color=Navy&default=true#color=Navy&width=D"
    ,list_id:"59cacd20d5cabadddb751b65"
    ,user_id:"59c9ca9d9abf99a03260e2ed"
    ,__v:0
    ,purchased:false
    ,timestamp:"2017-09-26T21:57:07.058Z"}]},
    listName: 'Public List',
    menuName: 'Make List Private',
    open: false,
    modalState: false,
    actions: [
      <FlatButton
      label="Yes"
      primary={true}
      keyboardFocused={true}
      onClick={()=>{this.handleModalOpen()}}
      />,
      <FlatButton
        label="No"
        primary={true}
        keyboardFocused={true}
        onClick={()=>{this.handleClose()}}
      />,
    ]

    }

<<<<<<< HEAD
    this.getUserData()
=======
  this.getUserData()
>>>>>>> rebasing

  }

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };


  // toggles list from private to public
  toggleListType() {
    var list = this.state.listName
    if (list === 'Public List') {
      this.setState({ listName: 'Private List', menuName: 'Make List Public' })
    } else {
      this.setState({ listName: 'Public List', menuName: 'Make List Private' })
    }
  }

  // API call to fetch user data
  getUserData() {
    var config = {
        method: 'GET',
         mode: 'no-cors'
<<<<<<< HEAD
        }
    fetch("/api/users/ross", config)
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      this.setState({ userData: res })
      this.setState({currentList: res.wishlists[1]})
      this.checkIfPublic()
    })
    .then(()=>{
      return
    })
  }

  handleModalOpen = () => {
    this.handleClose()
    this.setState({ modalState: true });
  };

  handleModalClose = () => {
    this.setState({ modalState: false });
  };

  // Checks if list is set to private or public
  checkIfPublic() {
    if (this.state.currentList.secret) {
      this.setState({ listName: 'Private List' })
    } else {
      this.setState({ listName: 'Public List' })
=======
        };
    fetch("http://localhost:3001/api/users", config)
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
>>>>>>> rebasing
  }
}

  // Adds item to this.state.userData array in the form of an object to be rendered
  addThing() {
    var temp = {}
    temp.name = 'Bike'
    temp.price = '$5.99'
    temp.link = <RaisedButton label="Give This Gift" secondary={true} style={style} />
    temp.image = 'http://www.wigglestatic.com/product-media/5360108808/Wiggle-Road-Bike-Road-Bikes-Black-1WGMY16R7048UK0001-6.jpg?w=2000&h=2000&a=7'
    var temp1 = this.state.userData.slice(0)
    temp1.push(temp)
    this.setState({userData: temp1})
  }

  // componentWillMount() {
  // }
  // <RaisedButton style={style.raisedButton} secondary label="Add Item"/>
  render() {
    return (
    <div style={style.backgroundStyle}>
        <div style={{minWidth: '100%'}} className="WishListPage">
          <div></div>
          <div style={{width: '65%', textAlign: 'center', marginLeft: '17.0%', borderRadius: '100%'}} >
          <br/>
          <span id=''></span>
          <RaisedButton style={style.raisedButton} secondary label="New Wishlist" />
          <RaisedButton onClick={ ()=>{this.addThing()} } style={style.raisedButton} secondary label="Share"/>
          <AddItem />
          <br/>
          <br/>
            <div>
            <Toolbar style={{width: '100%', backgroundColor: '#304FFE', color: 'white'}}>
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
                  {
                    this.state.userData.wishlists.map((name, index) =>{
                      return (
                        <MenuItem style={{borderBottom: '1px solid silver'}} primaryText={this.state.userData.wishlists[index].title} onClick={ ()=>{this.setState({ currentList: this.state.userData.wishlists[index] }) }} />
                      )
                    })
                  }
                </IconMenu>
              </ToolbarGroup>
            </Toolbar>
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
                  <TableRowColumn style={{fontSize: 18, width: '43%'}}>{row.title}</TableRowColumn>
                  <TableRowColumn  style={{fontSize: 18}}>${row.price}</TableRowColumn>
                  <TableRowColumn style={{color: 'white'}} >          <div>
                  <Dialog
                  actions={this.state.actions}
                  modal={false}
                  open={this.state.open}
                  onRequestClose={this.handleClose}
                  >

                  <p style={{color: 'black'}}>{row.title}</p>
                  <p style={{color: 'black'}}>Price: ${row.price}</p>
                  <p style={{color: 'black'}}>Comments from {this.state.userData.username[0].toUpperCase()+''+this.state.userData.username.slice(1)}: {row.comments}</p>
                  <Paper style ={{maxHeight: 290, maxWidth: 290}}><img style={{maxHeight: 290, maxWidth: 290}} src="https://dsw.scene7.com/is/image/DSWShoes/404995_001_ss_01?$colpg$"/></Paper>
                  <p style={{fontSize: 15, color: 'black'}}>Link to product: <a style={{height: 20, textDecoration: 'none',  color: 'white', backgroundColor: '#96beff', border: '1px solid #d8e7ff', padding: 1, fontSize: 14, borderRadius: '10%'}} href={row.url} target="_blank">Click Here</a></p>
                  <h3 style={{textAlign: 'right', marginTop: -50}}>Will you get this gift?</h3>
                  </Dialog>
                                              <Dialog

                              actions={this.state.modalActions}
                              modal={true}
                              open={this.state.modalState}>
                              <h2><img style={{height: 20, width: 20}} src="http://www.iconsdb.com/icons/preview/dark-gray/high-importance-xxl.png" /> Are you sure you are going to get this gift?</h2>
                              If you claim this gift, it will disappear. And nobody else will be able to get this for {this.state.userData.username[0].toUpperCase()+this.state.userData.username.slice(1)}.
                            </Dialog>
                    <RaisedButton secondary={true} label="Get Gift" onClick={this.handleOpen} />
                  </div></TableRowColumn>

                  <TableRowColumn hoverable={true} style={{ height: 140}}>
                    <Paper style={{maxWidth: 120, marginTop: 10, maxHeight: 120}} zDepth={1} >
                      <img alt="button" style={style.images} src='https://dsw.scene7.com/is/image/DSWShoes/404995_001_ss_01?$colpg$'/>
                    </Paper>

                    </TableRowColumn>
                  </TableRow>
                  ))

              }
            </TableBody>
          </Table>
          </div>
            </div>
        </div>

    </div>

    );
  }
}


export default WishListPage;
