import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserData} from '../actions/charts.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import moment from 'moment';

class UserData extends Component {

  componentWillMount() {
    this.props.fetchUserData(this.props.params.id);
  }

  renderRows() {
    console.log('user data', this.props.time);
    return this.props.time.map(data => {
      return (
        <tr key={data._id}>
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
    const {time} = this.props;
    console.log('time', time);
    if (!time) {
      return <div>Loading...</div>;
    }

    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>

            <Table responsive bordered condensed hover>
              <thead>
                <tr>
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

function mapStateToProps(state) {
  return {time: state.sheets.user};
}

UserData.propTypes = {
  time: PropTypes.array,
  fetchUserData: PropTypes.func,
  params: PropTypes.object
};

export default connect(mapStateToProps, {fetchUserData})(UserData);
