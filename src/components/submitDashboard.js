import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createTimesheet} from '../actions/time.actions';
import NewTimesheet2 from './newTimesheet2';
import {Link} from 'react-router';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

class SubmitDashboard extends Component {

  onSubmit(props) {
    console.log('on Submit props', props);
    this.props.createTimesheet(props);
    console.log('on Submit AFTER props', props);
    this.context.router.push('/');
  }

  render() {
    const {fields: {renderWeek}, handleSubmit} = this.props;
      // {fields: {dateWorked, hoursWorked, workType}, handleSubmit}
    console.log('render this props', this.props);
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>Select a Week</label>
            <div>
              <select {...renderWeek} value={renderWeek.value || ''}>
                <option/>
                <option value="10/17/2016">Week of 10/17/2016</option>
                <option value="10/24/2016">Week of 10/24/2016</option>
                <option value="10/31/2016">Week of 10/31/2016</option>
              </select>
            </div>
          </div>

          <LinkContainer to={'/timesheet/test/week/20161710'}>
            <strong>TESTEST</strong>
          </LinkContainer>

          <button type="submit" className="btn btn-primary">Select</button>
        </form>
        {this.props.children}
      </div>
    );
  }
}

SubmitDashboard.propTypes = {
  fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  createTimesheet: PropTypes.func,
  children: PropTypes.object
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'WeekForm',
  fields: ['renderWeek']
}, null, {createTimesheet})(SubmitDashboard);
