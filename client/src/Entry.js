import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Parallax } from 'react-parallax';

const Entry = props => {
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
          <CardMedia>
            <img src={props.data.image_url} />
          </CardMedia>
          <CardTitle
            title={props.data.title}
            subtitle={(() => {
              var date = new Date(props.data.timestamp).toLocaleString();
              return date;
            })()}
          />
          <CardText>{props.data.comments}</CardText>
          <CardActions>
            <FlatButton label="Link" />
            <FlatButton label="Claim" />
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};

export default Entry;
