import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTimesheetData} from '../actions/time.actions';
import {Link} from 'react-router';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import moment from 'moment';

class DashboardIndex extends Component {
  componentWillMount() {
    this.props.fetchTimesheetData();
  }

  renderRows() {
    let count = 0;
    return this.props.sheets.map(data => {
      count++;
      // below constants convert date object into simple mm/dd/yyyy format

      return (
        <tr key={data._id}>
          <td>{count}</td>
          <td>
            <Link to={'user/' + data.userInfo.sub}>
              <strong>{data.userInfo.firstName} {data.userInfo.lastName}</strong>
            </Link>
          </td>
          <td>{moment(data.dateWorked).format('MM/DD/YYYY')}</td>
          <td>{data.admin}</td>
          <td>{data.dev}</td>
          <td>{data.qa}</td>
          <td>{data.rd}</td>
          <td>{data.other}</td>
        </tr>
      );
    });
  }

  render() {
    console.log('data', this.props.sheets);
    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h3>Timesheet</h3>
            <Table responsive bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date Worked</th>
                  <th>Admin</th>
                  <th>Dev Work</th>
                  <th>QA</th>
                  <th>R&D</th>
                  <th>R&D</th>
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
  sheets: PropTypes.any
};

function mapStateToProps(state) {
  return {sheets: state.sheets.all};
}

export default connect(mapStateToProps, {fetchTimesheetData})(DashboardIndex);
