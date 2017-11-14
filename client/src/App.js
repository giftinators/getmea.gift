import React, { Component } from 'react';
import axios from 'axios';
import {AppBar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Router,
  Route,
  Link
} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Homepage from './Homepage';
import WishListPage from './WishListPage';
import Footer from './Footer';
import Login from './Login';
import Menu from 'material-ui/svg-icons/navigation/menu';
import AppDrawer from './AppDrawer';
import IconButton from 'material-ui/IconButton';

const history = createHistory();
//overwrite default theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#00AA8D',
    primary2Color: '#00BF9A',
    primary3Color: '#008975',
    accent1Color: '#008975'
  }
});

const style = {
  logo: {
    color: 'white',
    textDecoration: 'none'
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: true,
      drawerShow: false
    };

    this.setCurrentUser = (user) => {
      this.setState({currentUser: user});
      console.log('current user updated to: ', this.state.currentUser.username);
      console.log(this);
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
      <Router history={history}>
        <MuiThemeProvider muiTheme={muiTheme} >
          { this.state.currentUser && <div className='container'>
              <div className="App">
                <AppBar id='appBar'
                  title={<Link style={style.logo} to="/">Get Me A Gift</Link>}
                  iconElementLeft={<IconButton><Menu onClick={() => this.toggleDrawer()} /></IconButton>}
                  iconElementRight={<Login history={history} handleLogout={this.handleLogout.bind(this)} setCurrentUser={this.setCurrentUser.bind(this)} user={this.state.currentUser} currentList={this.state.currentList}/>}
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
