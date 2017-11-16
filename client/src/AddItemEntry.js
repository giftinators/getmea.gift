import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

const AddItemEntry = props => {
  return (
    <div 
    className="entry-card"
    style={{
      'display':'inline-block',
      'maxWidth':'32%',
      'backgroundColor':'red',
      'margin':'2px'
    }}>
      <Paper>
        <Card>
          <CardTitle
          title="Add item"
          ></CardTitle>
          <CardMedia>
            <img src="https://n6-img-fp.akamaized.net/free-icon/plus_318-140877.jpg?size=338&ext=jpg" />
          </CardMedia>
        </Card>
      </Paper>
    </div>
  );
};

export default AddItemEntry;
