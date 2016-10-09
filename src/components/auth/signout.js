import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth.actions';

class Signout extends Component {

  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div> Have a wonderful day! :-)</div>;
  }
}

export default connect(null, actions)(Signout);
