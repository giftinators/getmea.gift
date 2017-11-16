import React from 'react';
import Entry from './Entry';
import AddItemEntry from './AddItemEntry';

const EntryList = (props) => {
  return (
    <div>
      {props.list.map((row, index) => {
        return <Entry data={row}/>;
      })}
      <AddItemEntry />
    </div>
  );
};

export default EntryList;
