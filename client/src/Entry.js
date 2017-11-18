import React from 'react';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Parallax from 'react-parallax';

const Entry = props => {
  return (
    <div
      className="entry-card"
      style={{
        display: 'inline-block',
        maxWidth: '32%',
        backgroundColor: 'red',
        margin: '2px'
      }}
    >
      <Paper>
        <Card>
          {/* Add overlay to image, little banner */}
          {/* Consider replacing card media with parallax */}
          {/* <Parallax bgImage={props.data.image_url} /> */}
          <CardMedia>
            <img width="100px" height="100px" src={props.data.image_url} />
          </CardMedia>
          <CardTitle
            title={props.data.title}
            subtitle={(() => {
              var date = new Date(props.data.timestamp).toLocaleString();
              return date;
            })()}
          />
          <CardText>Rounded price: ${props.data.price}.00</CardText>
          <CardText>{props.data.comments}</CardText>
          <CardActions>
            {/* Add link which is supplied in the object */}
            <FlatButton label="Link" />
            <FlatButton label="Claim" />
          </CardActions>
        </Card>
      </Paper>
    </div>
  );
};

export default Entry;
