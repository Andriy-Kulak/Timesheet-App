import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserData} from '../actions/index';
import {Table, Grid, Col, Row} from 'react-bootstrap';

class UserData extends Component {

  componentWillMount() {
    this.props.fetchUserData(this.props.params.name);
  }


  renderRows() {
    console.log('user data', this.props.time);
    return this.props.time.map(data => {
      // below constants convert date object into simple mm/dd/yyyy format
      const cts = new Date(data.dateWorked);
      const cdate = (cts.getMonth() + 1) + '/' + cts.getDate() + '/' + cts.getFullYear();

      return (
        <tr key={data._id}>
          <td>{cdate}</td>
          <td>{data.hoursWorked}</td>
          <td>{data.workType}</td>
        </tr>
      );
    });
  }

  render() {
    const {time} = this.props;
    console.log('time', time);
    if (!time) {
      return <div>Loading...</div>;
    }

    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h3>Timesheet for: {this.props.time[0].name}</h3>
            <Table responsive bordered condensed hover>
              <thead>
                <tr>
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

function mapStateToProps(state) {
  return {time: state.sheets.user};
}

UserData.propTypes = {
  time: PropTypes.array,
  fetchUserData: PropTypes.func,
  params: PropTypes.object
};

export default connect(mapStateToProps, {fetchUserData})(UserData);
