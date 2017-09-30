import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Close from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
<<<<<<< HEAD
import Lock from 'material-ui/svg-icons/action/lock';
import Unlock from 'material-ui/svg-icons/action/lock-open';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import { Link } from 'react-router-dom';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme, showLists}) => {

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
              {/*props.history.push('/'+username+'/'+list._id);*/}
            }} />
        )
      })
    )

  }


=======
import { Link } from 'react-router-dom';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme}) => {
>>>>>>> 8724a016a4a6e9826600dbdcacd14587fc4df528
  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem leftIcon={<ArrowBack />} onClick={toggleDrawer} />
        <ProfileMenuSection currentUser={currentUser} />
        <Divider />

          {currentUser.username ?
<<<<<<< HEAD
            <MenuItem
              primaryText="My Lists"
              rightIcon={<ArrowDropRight />}
              menuItems={renderLists()}
            /> : null
=======
            <MenuItem onClick={toggleDrawer}>
              <Link to={'/'+currentUser.username}>My Lists</Link>
            </MenuItem> : null
>>>>>>> 8724a016a4a6e9826600dbdcacd14587fc4df528
          }

        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default muiThemeable()(AppDrawer);
