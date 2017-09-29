import React, { Component } from 'react';
import axios from 'axios';
import {AppBar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {colors} from 'material-ui/styles';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Homepage from './Homepage';
import WishListPage from './WishListPage';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';

import './App.scss';


//overwrite default theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.lightBlue500,
    primary2Color: colors.lightBlue300,
    primary3Color: colors.lightBlue700,
    accent1Color: colors.pink400
  }
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: {}
    };

    this.setCurrentUser = (user) => {
      this.setState({currentUser: user});
      console.log('current user updated to: ', this.state.currentUser.username);
    }

    this.getLoggedInUser = () => {
      axios.get('/api/me')
      .then((user) => {
        this.setState({
          currentUser: user.data
        })
      })
    }


      //////
    this.setCurrentList = (list) => {
      this.setState({
        currentList: list
      })
    }


  }

  componentWillMount() {
    this.getLoggedInUser();
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme} >
          <div className="App">
            <AppBar id='appBar'
              title={<Link className="logo" to="/">Get Me A Gift</Link>}
              iconElementRight={<Login setCurrentUser={this.setCurrentUser} user={this.state.currentUser} currentList={this.state.currentList}/>}
              zDepth={4}
            />
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/:username" foo="hi" component={(props) => <WishListPage {...props} currentUser={this.state.currentUser} />} />
            <Route exact path="/:username/:list_id" component={(props) => <WishListPage {...props} currentUser={this.state.currentUser} />} />
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
