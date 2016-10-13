import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions/auth.actions';

class Signup extends Component {
  handleFormSubmit(formProps) {
		// Call action creator to sign up user!
    this.props.signupUser(formProps);
    console.log('signup user component', formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
       );
    }
  }

  render() {
    const {handleSubmit, fields: {firstName, lastName, companyName,
		fbHandle, email, password, passwordConfirm}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>First Name:</label>
          <input {...firstName} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name:</label>
          <input {...lastName} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Company Name:</label>
          <input {...companyName} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Facebook Handle:</label>
          <input {...fbHandle} className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} className="form-control"/>
          {email.touched && email.error && <div className="error">{email.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} className="form-control" type="password"/>
          {password.touched && password.error && <div className="error">{password.error}</div>}
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <input {...passwordConfirm} className="form-control" type="password"/>
          {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Signup!</button>
      </form>
	);
  }
}

// form validation rules
function validate(formProps) {
  const errors = {};

	// TODOx: iterate over with forEach loop for remaining values to prevent repetitive code as well as the form itself

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

Signup.propTypes = {
  signupUser: PropTypes.func,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signup',
  fields: [
    'firstName',
    'lastName',
    'companyName',
    'fbHandle',
    'email',
    'password',
    'passwordConfirm'
  ],
  validate
}, mapStateToProps, actions)(Signup);
// actions is always the third argument
