import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {signupUser} from '../../actions/auth.actions';
import {connect} from 'react-redux';

class Signup extends Component {
  handleFormSubmit(formProps) {
		// Call action creator to sign up user!
    console.log('signup user component', formProps);
    signupUser(formProps);
  }

  renderAlert() {
    console.log('BEFORE return render alert', this.props);
    if (this.props.errorMessage) {
      console.log('past the return render alert', this.props.errorMessage);
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
       );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>First Name:</label>
          <Field name="firstName" component="input" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Last Name:</label>
          <Field name="lastName" component="input" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" component="input" className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" component="input" className="form-control" type="password"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field name="passwordConfirm" component="input" className="form-control" type="password"/>
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
  console.log('state auth error', state.auth.error);
  return {errorMessage: state.auth.error};
}

const SignUpForm = reduxForm({
  form: 'signup'
  // , validate
}, null, {signupUser})(Signup);


export default connect(mapStateToProps)(SignUpForm);
// actions is always the third argument


// {touched && error && <div className="error">{errors.email}</div>}

// {password.touched && password.error && <div className="error">{password.error}</div>}
//  {passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
