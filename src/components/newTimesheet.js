import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createTimesheet} from '../actions/index';
import {Link} from 'react-router';

class NewTimesheet extends Component {

  onSubmit(props) {
    this.props.createTimesheet(props)
      .then(() => {
        console.log('submitted the request');
        // timesheet has been created, navigate the user to the index
        // We navigate by calling this.context.router.push with the
        // new path to navigate to.
        this.context.router.push('/');
      });
  }

  render() {
    const {fields: {name, date_worked, hours_worked, work_type}, handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Submit Your Time</h3>

        <div className={`form-group ${name.touched && name.invalid ? 'has-danger' : ''}`}>
          <label>Name</label>
          <input type="text" className="form-control" {...name}/>
          <div className="text-help">
            {name.touched ? name.error : ''}
          </div>
        </div>

        <div className={`form-group ${date_worked.touched && date_worked.invalid ? 'has-danger' : ''}`}>
          <label>Date Worked</label>
          <input type="date" className="form-control" {...date_worked}/>
          <div className="text-help">
            {date_worked.touched ? date_worked.error : ''}
          </div>
        </div>

        <div className={`form-group ${hours_worked.touched && hours_worked.invalid ? 'has-danger' : ''}`}>
          <label>Hours Worked</label>
          <input type="number" className="form-control" {...hours_worked}/>
          <div className="text-help">
            {hours_worked.touched ? hours_worked.error : ''}
          </div>
        </div>

        <div className={`form-group ${work_type.touched && work_type.invalid ? 'has-danger' : ''}`}>
          <label>Work Type</label>
          <input type="text" className="form-control" {...work_type}/>
          <div className="text-help">
            {work_type.touched ? work_type.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'Enter a proper name';
  }
  if (!values.date_worked) {
    errors.date_worked = 'Enter proper Date';
  }
  if (!values.hours_worked) {
    errors.hours_worked = 'Enter a proper number';
  }
  if (!values.work_type) {
    errors.work_type = 'Enter proper work type';
  }

  return errors;
}

NewTimesheet.propTypes = {
  createTimesheet: PropTypes.func,
  fields: PropTypes.object,
  handleSubmit: PropTypes.func

};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'TimesheetNewForm',
  fields: ['name', 'hours_worked', 'date_worked', 'work_type'],
  validate
}, null, {createTimesheet})(NewTimesheet);
