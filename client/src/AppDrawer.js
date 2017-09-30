import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Close from 'material-ui/svg-icons/navigation/close';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import { Link } from 'react-router-dom';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme}) => {
  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem leftIcon={<ArrowBack />} onClick={toggleDrawer} />
        <ProfileMenuSection currentUser={currentUser} />
        <Divider />

          {currentUser.username ?
            <MenuItem onClick={toggleDrawer}>
              <Link to={'/'+currentUser.username}>My Lists</Link>
            </MenuItem> : null
          }

        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default muiThemeable()(AppDrawer);
