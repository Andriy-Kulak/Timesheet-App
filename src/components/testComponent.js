import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTest} from '../actions/time.actions';
import {Link} from 'react-router';
import {Table, Grid, Col, Row} from 'react-bootstrap';

class Test extends Component {
  componentWillMount() {
    this.props.fetchTest();
  }

  renderRows() {
    console.log('user data', this.props.sheets);
    return this.props.sheets.map(data => {
      // below constants convert date object into simple mm/dd/yyyy format
      const cts = new Date(data.dateWorked);
      const cdate = (cts.getMonth() + 1) + '/' + cts.getDate() + '/' + cts.getFullYear();

      return (
        <tr key={data._id}>
          <td>
            <Link to={'user/' + data.name}>
              <strong>{data.name}</strong>
            </Link>
          </td>
          <td>{cdate}</td>
          <td>{data.hoursWorked}</td>
          <td>{data.workType}</td>
        </tr>
      );
    });
  }

  render() {
    const {sheets} = this.props;
    console.log('time', sheets);
    if (!sheets) {
      return <div>Loading...</div>;
    }

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

Test.propTypes = {
  fetchTimesheetData: PropTypes.func,
  sheets: PropTypes.array
};

function mapStateToProps(state) {
  return {sheets: state.sheets.test};
}

export default connect(mapStateToProps, {fetchTest})(Test);
