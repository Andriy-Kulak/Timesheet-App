import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserData} from '../actions/index';
import {Link} from 'react-router';

class UserData extends Component {

  componentWillMount() {
    this.props.fetchUserData(this.props.params.id);
  }

  render() {
    const {time} = this.props;
    console.log('time', time);
    if (!time) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link to="/">Back To Index</Link>
        <h3>Name: {time[0].name}</h3>
        <h6>Date Worked: {time[0].date_worked}</h6>
        <p>Type: {time[0].work_type}</p>
        <p>Hours Worked: {time[0].hours_worked}</p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {time: state.sheets.user};
}

UserData.propTypes = {
  time: PropTypes.array,
  fetchUserData: PropTypes.func,
  params: PropTypes.object
};

export default connect(mapStateToProps, {fetchUserData})(UserData);
