import React from 'react';
import Entry from './Entry';

const EntryList = (props) => {
  return (
    <div style={{float: 'left', maxWidth:'100%'}}>
      {props.list.map((row, index) => {
        return <Entry data={row}/>;
      })}
      {props.addListComponent}
    </div>
  );
};

export default EntryList;
