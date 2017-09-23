import React, { Component } from 'react';
import {Paper, RaisedButton} from 'material-ui';
import { Flex, Box } from 'reflexbox'

import background from './balloons.jpg'

const style = {
  hero: {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 400,
    verticalAlign: 'middle'
  },
  heroMessage: {
    color: 'white',
    margin: '0px auto',
    verticalAlign: 'middle',
    fontSize: 45
  }
}

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // componentWillMount() {
  // }

  render() {
    return (
        <div className="Homepage">
          <Paper style={style.hero} zDepth={1} rounded={false}>
            <Flex column style={{height:'100%'}} justify="center" align='center'>
              <Box p={1}>
                <div style={style.heroMessage}>Something about wishlist here</div>
              </Box>
              <Box p={1}>
                <RaisedButton secondary label="Get Started" />
              </Box>
            </Flex>
          </Paper>
        </div>
    );
  }
}

export default Homepage;
