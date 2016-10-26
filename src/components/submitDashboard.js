import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet} from '../actions/time.actions';
import moment from 'moment';

class SubmitDashboard extends Component {

  onSubmit(props) {
    console.log('props.renderWeek', props.renderWeek);
    this.context.router.push(`/timesheet/test2/week/${props.renderWeek}`);
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

    return monArray.map(data => {
      return (
        <option key={data.value} value={data.value}>Week of {data.monDate}</option>
      );
    });
  }

  render() {
    const {handleSubmit} = this.props;
    console.log('render this props', this.props);
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>Select a Week</label>
            <div>
              <Field name="renderWeek" component="select">
                <option/>
                {this.getMondays()}
              </Field>
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Select</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

SubmitDashboard.propTypes = {
  handleSubmit: PropTypes.func,
  children: PropTypes.object
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
