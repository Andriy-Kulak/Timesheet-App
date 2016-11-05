import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUsers} from '../../actions/charts.actions';
import {Grid, Col, Row, Panel} from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import {browserHistory} from 'react-router';
import Legend from './legend';

class UserSelect extends Component {

  componentDidMount() {
    // fetches the list of all users from 'users'
    fetchUsers();
  }

  static contextTypes = {
    router: PropTypes.object
  };

  render() {
    let options = [];
    if (this.props.userOptions.length > 0) {
      options = this.props.userOptions;
    }

    function logChange(val) {
      // pushes user to updated URL. the child components use this.props.id
      // to reference the specific user
      browserHistory.push(`/chart/${val.value}`);
    }

    const title = (
      <h3 className="header-panel"><b>Analytics Dashboard: Average Weekly Hours by User</b></h3>
    );

    const title2 = (
      <h3 className="header-panel"><b>Control Panel</b></h3>
    );

    return (
      <Grid>
        <Row>
          <Col mdOffset={1} md={2}>
            <Panel header={title2} bsStyle="info">
              <h5><u>Selected User:</u></h5>
              <Select
                name="form-field-name"
                value={this.props.params.id}
                options={options}
                onChange={logChange}
                />
              <Legend/>
            </Panel>
          </Col>
          <Col md={8}>
            <Panel header={title} bsStyle="info">
              {this.props.children}
            </Panel>
          </Col>
        </Row>
      </Grid>
    );
  }
}
UserSelect.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state) {
  return {
    time: state.sheets.user,
    userOptions: state.sheets.allUsersInfo
  };
}

UserSelect.propTypes = {
  userOptions: PropTypes.array,
  params: PropTypes.object,
  children: PropTypes.object
};

export default connect(mapStateToProps, {fetchUsers})(UserSelect);
