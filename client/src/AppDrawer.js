import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import Lock from 'material-ui/svg-icons/action/lock';
import Unlock from 'material-ui/svg-icons/action/lock-open';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {withRouter} from 'react-router';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme, showLists, history, setCurrentList}) => {
  console.log('history: ', history);
  const renderLists = () => {

    var username = currentUser.username;
    return (
      currentUser.wishlists.map((list, index) => {
        return (
          <MenuItem
            key={index}
            style={{borderBottom: '1px solid silver'}}
            rightIcon={list.secret ? <Lock /> : <Unlock />}
            primaryText={list.title}
            onClick={ () => {
              history.push('/'+username+'/'+list._id);
              setCurrentList(list);
              toggleDrawer();
            } }
          ></MenuItem>
        )
      })
    )
  }

  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem leftIcon={<ArrowBack />} onClick={toggleDrawer} />
        <ProfileMenuSection currentUser={currentUser} />
        <Divider />

          {currentUser.username ?
            <MenuItem
              primaryText="My Lists"
              rightIcon={<ArrowDropRight />}
              menuItems={renderLists()}
            ></MenuItem> : null
          }

        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default withRouter(muiThemeable()(AppDrawer));
