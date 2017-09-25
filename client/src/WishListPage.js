import React, {Component} from 'react';
import ReactDOM from 'react-dom';
// dded gridList and gridTile for grid divs. May not need all
import {AppBar, RaisedButton, GridList, GridTile, Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui';

// added for grid stuff, may not need all
import {colors} from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

//imports for MUI list styles
import {List, ListItem} from 'material-ui/List';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import Divider from 'material-ui/Divider';
import ActionInfo from 'material-ui/svg-icons/action/info';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
// end of list style MUI imports

// imports for Avatar
import Avatar from 'material-ui/Avatar';
// end imports for avatar

//imports for paper
import Paper from 'material-ui/Paper';
// end of paper imports

// Import for table/list
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';

// toolbar imports
import IconMenu from 'material-ui/IconMenu';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
// end of toolbar inputs

// WishLists menu imports
import Menu from 'material-ui/Menu';
// end of wishlist menu imports


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

const menuStyle = {
  display: 'inline-block',
  margin: '16px 32px 16px 0',
};

const MenuExampleSimple = () => (
  <div>
    <Paper menuStyle={style}>
      <Menu>
        <MenuItem primaryText="Maps" />
        <MenuItem primaryText="Books" />
        <MenuItem primaryText="Flights" />
        <MenuItem primaryText="Apps" />
      </Menu>
    </Paper>
  </div>
);

const styles = {
  propContainer: {
    overflow: 'hidden',
    margin: '20px auto 0',
  },
  propToggleHeader: {
    margin: '20px auto 10px',
  },
};



class Test extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return <p style={{
      textAlign: 'right',
      marginTop: '-20px'
    }}>$9.99</p>
  }
}

class WishListPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData: [
        {
          name: 'Bike',
          price: '$9.99',
          link: <RaisedButton label="Give This Gift" secondary={true} style={style} />,
          image: 'http://www.wigglestatic.com/product-media/5360108808/Wiggle-Road-Bike-Road-Bikes-Black-1WGMY16R7048UK0001-6.jpg?w=2000&h=2000&a=7'
        },
        {
          name: 'PS4',
          price: '$109.99',
          link: <RaisedButton label="Give This Gift" secondary={true} style={style} />,
          image: 'http://cdn.images.express.co.uk/img/dynamic/143/590x/PS4-Pro-review-734721.jpg'
        },
        {
          name: 'basketball',
          price: '$.99',
          link: <RaisedButton label="Give This Gift" secondary={true} style={style} />,
          image: 'http://shop.wilson.com/media/catalog/product/cache/38/image/9df78eab33525d08d6e5fb8d27136e95/w/t/wtb0516r-1.jpg'
        },
        {
        name: 'Gifted',
        price: '$119.91',
        link: <RaisedButton label="Gifted" primary={true} style={style} />,
        image: 'https://cdn0.iconfinder.com/data/icons/love-wedding-valentine-1/512/30-512.png'
      }
    ],
    listName: 'Public List',
    menuName: 'Make List Private'
  }

  }

  toggleListType() {
    var list = this.state.listName
    if (list === 'Public List') {
      this.setState({ listName: 'Private List', menuName: 'Make List Public' })
    } else {
      this.setState({ listName: 'Public List', menuName: 'Make List Private' })
    }
  }

  addThing() {
    var temp = {}
    temp.name = 'Bike'
    temp.price = '$5.99'
    temp.link = <RaisedButton label="Give This Gift" secondary={true} style={style} />,
    temp.image = 'http://www.wigglestatic.com/product-media/5360108808/Wiggle-Road-Bike-Road-Bikes-Black-1WGMY16R7048UK0001-6.jpg?w=2000&h=2000&a=7'
    var temp1 = this.state.userData.slice(0)
    temp1.push(temp)
    this.setState({userData: temp1})
  }

  // componentWillMount() {
  // }

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
          <RaisedButton style={style.raisedButton} secondary label="Add Item"/>
          <br/>
          <br/>
                  <div>
                  <Toolbar style={{width: '100%', backgroundColor: '#304FFE', color: 'white'}}>
                    <ToolbarGroup style={{fontSize: 30}} >
                      Kennys Christmas Wishlist
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
                        <MenuItem primaryText="Delete List" />
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
            {this.state.userData.map( (row, index) => (
              <TableRow hoverable={true} key={index}>
                <TableRowColumn style={{fontSize: 18}}>{row.name}</TableRowColumn>
                <TableRowColumn  style={{fontSize: 18}}>{row.price}</TableRowColumn>
                <TableRowColumn  style={{fontSize: 18}}><a href="www.yahoo.com">{row.link}</a></TableRowColumn>

                <TableRowColumn hoverable={true} style={{ height: 140}}>
                  <Paper style={{maxWidth: 120, marginTop: 10, maxHeight: 120}} zDepth={1} >
                    <img style={style.images} src={row.image}/>
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



export default WishListPage;
