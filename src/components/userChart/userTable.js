import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserData} from '../../actions/charts.actions';
import {Table, Col, Row, Panel} from 'react-bootstrap';
import moment from 'moment';
import {parseJwt} from '../../actions/auth.actions';

class UserTable extends Component {

  componentDidMount() {
    console.log('render userTEs');
    this.props.fetchUserData(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.id !== this.props.params.id) {
      this.props.fetchUserData(nextProps.params.id);
    }
  }

  renderRows() {
    return this.props.time.map(data => {
      return (
        <tr key={data._id}>
          <td>{moment(data.weekOf).format('MM/DD/YYYY')}</td>
          <td>{data.admin}</td>
          <td>{data.dev}</td>
          <td>{data.qa}</td>
          <td>{data.rd}</td>
          <td>{data.other}</td>
          <td>{data.total}</td>
        </tr>
      );
    });
  }

  render() {
    const {time} = this.props;
    if (!time) {
      return <div>Loading...</div>;
    }

    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);

    const title = (
      <h3 className="header-panel">Timesheet Summary for: <b>{userInfo.firstName} {userInfo.lastName}</b></h3>
    );

    console.log('outside props', this.props);
    return (
      <div>
        <Row>
          <Col mdOffset={3} md={6}>
            <Panel header={title} bsStyle="info">
              <Table responsive bordered condensed hover>
                <thead>
                  <tr>
                    <th >Week Of:</th>
                    <th className="sum-chart-width">Admin</th>
                    <th className="sum-chart-width">Dev Work</th>
                    <th className="sum-chart-width">QA</th>
                    <th className="sum-chart-width">R&D</th>
                    <th className="sum-chart-width">Other</th>
                    <th className="sum-chart-width">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {this.renderRows()}
                </tbody>
              </Table>
            </Panel>
          </Col>
        </Row>
      </div>
    );
  }
}

UserTable.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  console.log('state.sheets.allUsersInfo', state.sheets.user);
  return {
    time: state.sheets.user
  };
}

UserTable.propTypes = {
  time: PropTypes.array,
  fetchUserData: PropTypes.func,
  params: PropTypes.object
};

export default connect(mapStateToProps, {fetchUserData})(UserTable);
