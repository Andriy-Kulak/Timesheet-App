import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTimesheetData} from '../actions/index';
import {Link} from 'react-router';

class DashboardIndex extends Component {
  componentWillMount() {
    this.props.fetchTimesheetData();
  }

  renderData() {
    return this.props.sheets.map(data => {
      return (
        <li className="list-group-item" key={data.id}>
          <Link to={'user/' + data.id}>
            <p>Name:<strong>{data.name}</strong></p>
          </Link>
          <p>Date Worked: {data.date_worked}</p>
          <p>Hours Worked: {data.hours_worked}</p>
          <p>Work Type: {data.work_type}</p>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link to="/timesheet/new" className="btn btn-primary">
            Submit Time
          </Link>
        </div>
        <h3>Timesheet</h3>
        <ul className="list-group">
          {this.renderData()}
        </ul>
      </div>
    );
  }
}

DashboardIndex.propTypes = {
  fetchTimesheetData: PropTypes.func,
  sheets: PropTypes.array
};

function mapStateToProps(state) {
  return {sheets: state.sheets.all};
}

export default connect(mapStateToProps, {fetchTimesheetData})(DashboardIndex);
