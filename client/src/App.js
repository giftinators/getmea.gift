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
import './App.scss';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AppDrawer from './AppDrawer';
import IconButton from 'material-ui/IconButton';


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
      currentUser: null,
      drawerShow: false
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

    this.setCurrentList = (list) => {
      this.setState({
        currentList: list
      })
    }

    this.toggleDrawer = () => {
      this.setState({
        drawerShow: !this.state.drawerShow
      })
    }

    this.handleLogout = (e) => {
      e.preventDefault();
      axios('/api/logout')
      .then((response) => {
        this.setCurrentUser({});
      })
      .catch(function (error) {
        console.log(error);
      });
    };

  }

  componentWillMount() {
    this.getLoggedInUser();
  }

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme} >
          { this.state.currentUser &&
            <div className='container'>
              <div className="App">
              <AppBar id='appBar'
                title={<Link className="logo" to="/">Get Me A Gift</Link>}
                iconElementLeft={<IconButton><Menu onClick={() => this.toggleDrawer()} /></IconButton>}
                iconElementRight={<Login handleLogout={this.handleLogout.bind(this)} setCurrentUser={this.setCurrentUser.bind(this)} user={this.state.currentUser} currentList={this.state.currentList}/>}
                zDepth={4}
              ></AppBar>
              <AppDrawer handleLogout={this.handleLogout.bind(this)} currentUser={this.state.currentUser} setCurrentList={this.setCurrentList.bind(this)} toggleDrawer={this.toggleDrawer.bind(this)} open={this.state.drawerShow} />
              <Route exact path="/" component={Homepage}/>
              <Route exact path="/:username" component={(props) => <WishListPage {...props} currentUser={this.state.currentUser} />} />
              <Route exact path="/:username/:list_id" component={(props) => <WishListPage {...props} currentUser={this.state.currentUser} />} />
              <Footer />
              </div>
            </div>
          }

        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
