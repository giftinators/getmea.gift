import React, { Component } from 'react';
import {Paper, RaisedButton} from 'material-ui';
import { Flex, Box } from 'reflexbox'

import balloons from './img/balloons.jpg'
import feature1 from './img/feature1.png'
import feature2 from './img/feature2.png'
import feature3 from './img/feature3.png'
import './Homepage.scss';
import Signup from './Signup.js'
import Login from './Login.js'

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
    fontSize: 45,
    textAlign: 'center'
  }
}

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSignupVisible: false
    };
  }

  toggleLogin = () => {
    this.setState( {isSignupVisible: !this.state.isSignupVisible} )
  }

  // componentWillMount() {
  // }

  render() {
    return (
        <div className="Homepage">
          <Paper style={style.hero} zDepth={1} rounded={false}>
            <Flex column style={{height:'100%'}} justify="center" align='center'>
              <Box p={2}>
                <div style={style.heroMessage}>Create and Share Wishlists!</div>
              </Box>
              <Box p={2}>
                <RaisedButton onClick = { ()=>{ this.toggleLogin() } } secondary label="Get Started" />
                { this.state.isSignupVisible ? <Signup history={this.props.history} setCurrentUser={this.props.setCurrentUser} /> : null }
              </Box>
            </Flex>
          </Paper>
          <div className="row">
            <div className="col">
              <img style={{width:'100%'}} src={feature1} alt="screenshot"/>
            </div>
            <div className="col">
              <h1>Create your own wishlists!</h1>
              <div>Save all of your wanted products from all over the web in one central location! Organize lists by theme or by event!</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <h1>Buy Gifts for Friends!</h1>
              <div>Indicate that you will purchase a gift from a friend's list so others know not to buy it.</div>
            </div>
            <div className="col">
              <img style={{width:'100%'}} src={feature2} alt="screenshot"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <img style={{width:'100%'}} src={feature3} alt="screenshot"/>
            </div>
            <div className="col">
              <h1>Share your wishlists</h1>
              <div>Easily generate share</div>
            </div>
          </div>
        </div>
    );
  }
}

export default Homepage;
