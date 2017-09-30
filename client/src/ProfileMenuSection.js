import React from 'react';
import Avatar from 'material-ui/Avatar';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import Person from 'material-ui/svg-icons/social/person';

const styles = {
  main: {
    display: 'inlineFlex'
  },
  avatar: {
    margin: 15
  },
  name: {
    fontSize: '1.5em'
  }
}

const ProfileMenuSection = ({currentUser}) => {
  return (
    <div style={styles.main}>

      <Avatar style={styles.avatar} icon={<Person />}/>

      <span style={styles.name}>
        {currentUser.username.toUpperCase()}
      </span>
    </div>
  )
}

export default ProfileMenuSection;
