import React, { Component } from 'react';
import {AppBar} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {colors} from 'material-ui/styles';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Homepage from './Homepage';
import WishListPage from './WishListPage';
import Footer from './Footer';
import Login from './Login';
import Signup from './Signup';

//overwrite default theme
const muiTheme = getMuiTheme({
  palette: {
    primary1Color: colors.indigoA700,
    primary2Color: colors.indigo400,
    primary3Color: colors.orange200,
    accent1Color: colors.blue200,
    alternateTextColor: colors.white
  }
});

class App extends Component {
  constructor() {
    super();

    this.state = {
    };
  }

  // componentWillMount() {
  // }

  render() {
    return (
      <Router>
        <MuiThemeProvider muiTheme={muiTheme} >
          <div className="App">
            <AppBar
              title={<span>Get Me A Gift</span>}
              iconElementRight={<Login />}
              zDepth={4}
            />
            <Route exact path="/" component={Homepage}/>
            <Route exact path="/:username" component={WishListPage}/>
            <Route exact path="/:username/:list_id" component={WishListPage}/>
            <Route path='/login' render={routeProps => <Login open={false}/>} />
            <Route path='/signup' render={routeProps => <Signup open={false}/>} />
            <Footer />
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default App;
