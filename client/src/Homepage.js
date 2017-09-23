import React, { Component } from 'react';
import {Paper, RaisedButton} from 'material-ui';
import { Flex, Box } from 'reflexbox'

import balloons from './balloons.jpg'

const style = {
  hero: {
    backgroundImage: `url(${balloons})`,
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
              <Box p={2}>
                <div style={style.heroMessage}>Some kind of call to action here</div>
              </Box>
              <Box p={2}>
                <RaisedButton secondary label="Get Started" />
              </Box>
            </Flex>
          </Paper>
          <Flex justify="center" p={4} align='center'>
            <Box w={1} p={1}>
              <img style={{width:'100%'}} src="http://via.placeholder.com/1800x1200?text=screenshot+of+app" alt="screenshot"/>
            </Box>
            <Box w={1} p={1}>
              <div>Marketing content here</div>
            </Box>
          </Flex>
          <Flex justify="center" p={4} pt={0} align='center'>
            <Box w={1} p={1}>
              <div>Marketing content here</div>
            </Box>
            <Box w={1} p={1}>
              <img style={{width:'100%'}} src="http://via.placeholder.com/1800x1200?text=screenshot+of+app" alt="screenshot"/>
            </Box>
          </Flex>
        </div>
    );
  }
}

export default Homepage;
