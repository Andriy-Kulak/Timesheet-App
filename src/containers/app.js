import React, {Component, PropTypes} from 'react';
import NavBar from '../components/navbar';

export default class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
};
