import React, { Component } from 'react';
// import {AppBar} from 'material-ui';

const style = {
  wrapper: {
    backgroundColor: '#fafafa',
    padding: 25
  }
};

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  // componentWillMount() {
  // }

  render() {
    return (
        <div className="Footer" style={style.wrapper}>
          <div className="copywrite">&copy; 2017 Get Me A Gift</div>
        </div>
    );
  }
}

export default Footer;
