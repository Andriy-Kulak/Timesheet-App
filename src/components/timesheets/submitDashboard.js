import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import {Grid, Col, Row, Panel} from 'react-bootstrap';
import 'react-select/dist/react-select.css';
import Select from 'react-select';
import {browserHistory} from 'react-router';

class SubmitDashboard extends Component {

  render() {
    const options = [];
    let i = moment('2016-10-03').format('YYYYMMDD');
    while (i <= moment().add(2, 'week').format('YYYYMMDD')) {
      options.push({value: i, label: 'Week of ' + moment(i).format('MM/DD/YYYY')});
      i = moment(i).add(1, 'week').format('YYYYMMDD');
    }

    function logChange(val) {
      // pushes user to updated URL. the child components use this.props.id
      // to reference the specific user
      browserHistory.push(`/timesheet/week/${val.value}`);
    }

    return (
      <Grid>
        <Row>
          <Col mdOffset={1} md={3}>
            <Panel header="Selected Week:" bsStyle="info">
              <Select
                name="form-field-name"
                value={this.props.params.id}
                options={options}
                onChange={logChange}
                />
            </Panel>
          </Col>
          <Col md={6}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

SubmitDashboard.propTypes = {
  children: PropTypes.object,
  params: PropTypes.object
};

SubmitDashboard.contextTypes = {
  router: PropTypes.object
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default SubmitDashboard;
