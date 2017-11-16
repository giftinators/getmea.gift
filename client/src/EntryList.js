import React from 'react';
import Entry from './Entry';

const EntryList = (props) => {
  return (
    <div>
      {props.list.map((row, index) => {
        console.log(row);
        return <Entry data={row}/>;
      })}
    </div>
  );
};

export default EntryList;
