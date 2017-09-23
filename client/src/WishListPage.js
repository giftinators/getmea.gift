import React, {Component} from 'react';
// dded gridList and gridTile for grid divs. May not need all
import {AppBar, RaisedButton, GridList, GridTile} from 'material-ui';

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

const style = {
  raisedButton: {
    float: 'right',
    marginRight: 20
  },
  listStyle: {
    marginLeft: 200,
    paddingLeft: 200,
    width: '100%'
  },
  avatarStyle: {
    width: 100,
    height: 100
  },
  paperStyle: {
    width: '100%',
    height: '100%'
  }
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

    this.state = {};
  }

  // componentWillMount() {
  // }

  render() {
    return (
      <GridList style={style.gridStyles}>
        <div className="WishListPage">
          <div></div>
          <br/>
          <RaisedButton style={style.raisedButton} label="Share" primary={true}/>
          <RaisedButton style={style.raisedButton} label="Wishlist" primary={true}/>
          <RaisedButton style={style.raisedButton} label="Add Item" primary={true}/>
          <br/>
          <br/>
          <List style={style.listStyle}>
            <Paper style={style.paperStyle} zDepth={1}>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <ListItem primaryText="My 2 front teeth" secondaryText={< Test />}/>
              <ListItem primaryText="A bicycle" secondaryText={< Test />}/>
              <ListItem primaryText="A new Xbox because PS sucks" secondaryText={< Test />}/>
              <ListItem primaryText="Sexy Female Elves" secondaryText={< Test />}/>
            </Paper>
          </List>
        </div>
      </GridList>
    );
  }
}

export default WishListPage;
