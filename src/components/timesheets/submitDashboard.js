import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet} from '../../actions/time.actions';
import moment from 'moment';
import {Grid, Col, Row} from 'react-bootstrap';

class SubmitDashboard extends Component {

  onSubmit(props) {
    console.log('props.renderWeek', props.renderWeek);
    console.log('this.context', this.context);
    this.context.router.push(`/timesheet/week/${props.renderWeek}`);
  }

  // creates a monday date from October 3, 2016 to any date two weeks from today
  // this is then referenced in uri and timesheet app to keep track of which week the user is on
  getMondays() {
    const monArray = [];
    let i = moment('2016-10-03').format('YYYYMMDD');
    while (i <= moment().add(2, 'week').format('YYYYMMDD')) {
      monArray.push({value: i, monDate: moment(i).format('MM/DD/YYYY')});
      i = moment(i).add(1, 'week').format('YYYYMMDD');
    }

    console.log('render this props', this.props.params.id);
    return monArray.map(data => {
      return (
        <option key={data.value} value={data.value}>Week of {data.monDate}</option>
      );
    });
  }

  render() {
    const {handleSubmit} = this.props;

    const weekTaken = this.props.params.id;

    return (

      <Grid>
        <Row>
          <Col mdOffset={2} md={2}>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <div>
                <label>Select a Week</label>
                <div>
                  <Field name="renderWeek" component="select">
                    {weekTaken && <option value="this.props.params.id">Week of {moment(weekTaken).format('MM/DD/YYYY')}</option>}
                    {!weekTaken && <option/>}
                    {this.getMondays()}
                  </Field>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">Select</button>
            </form>
          </Col>
          <Col md={4}>
            {this.props.children}
          </Col>
        </Row>
      </Grid>
    );
  }
}

SubmitDashboard.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.object,
  params: PropTypes.object
};

SubmitDashboard.contextTypes = {
  router: PropTypes.object
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'WeekForm',
  fields: ['renderWeek']
}, null, {createTimesheet})(SubmitDashboard);
