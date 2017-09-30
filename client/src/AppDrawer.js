import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import Close from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';
import ProfileMenuSection from './ProfileMenuSection';
import muiThemeable from 'material-ui/styles/muiThemeable';

const AppDrawer = ({open, toggleDrawer, currentUser, muiTheme}) => {
  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem style={{color: muiTheme.palette.accent1Color}} rightIcon={<Close color={muiTheme.palette.accent1Color}/>} onClick={toggleDrawer}>
          Close
        </MenuItem>
        <Divider />
        <ProfileMenuSection currentUser={currentUser} />
        <Divider />
        <MenuItem onClick={toggleDrawer}>
          <Link to={'/'+currentUser.username}>My Lists</Link>
        </MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default muiThemeable()(AppDrawer);
