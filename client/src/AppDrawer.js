import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Close from 'material-ui/svg-icons/navigation/close';
import { Link } from 'react-router-dom';

const AppDrawer = ({open, toggleDrawer, currentUser}) => {
  return (
    <div>
      <Drawer open={open} onClick={toggleDrawer}>
        <MenuItem rightIcon={<Close />} onClick={toggleDrawer}>
          Close
        </MenuItem>
        <MenuItem onClick={toggleDrawer}>
          <Link to={'/'+currentUser.username}>My Lists</Link>
        </MenuItem>
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </Drawer>
    </div>
  );
}

export default AppDrawer;
