import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTimesheetData} from '../actions/index';
import {Link} from 'react-router';
import {Table, Grid, Col, Row} from 'react-bootstrap';

class DashboardIndex extends Component {
  componentWillMount() {
    this.props.fetchTimesheetData();
  }

  renderRows() {
    return this.props.sheets.map(data => {
      // below constants convert date object into simple mm/dd/yyyy format
      const cts = new Date(data.date_worked);
      const cdate = (cts.getMonth() + 1) + '/' + cts.getDate() + '/' + cts.getFullYear();

      return (
        <tr key={data.id}>
          <td>
            <Link to={'user/' + data.id}>
              <strong>{data.name}</strong>
            </Link>
          </td>
          <td>{cdate}</td>
          <td>{data.hours_worked}</td>
          <td>{data.work_type}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h3>Timesheet</h3>
            <Table responsive bordered condensed hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date Worked</th>
                  <th>Hours Worked</th>
                  <th>Work Type</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
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