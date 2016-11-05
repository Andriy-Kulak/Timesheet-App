import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {signupUser} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import {Grid, Col, Row, Panel} from 'react-bootstrap';

class Signup extends Component {
  handleFormSubmit(formProps) {
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

    const renderField = ({input, label, type, meta: {touched, error}}) => (
      <div>
        <fieldset className="form-group">
          <label>{label}</label>
          <div>
            <input {...input} type={type} className="form-control"/>
            {touched && ((error && <span className="red-text">{error}</span>))}
          </div>
        </fieldset>
      </div>
    );

    return (
      <Grid>
        <Row>
          <Col mdOffset={4} md={4}>
            <Panel header="Sign Up" bsStyle="info">
              <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="firstName" label="First Name" type="text" component={renderField}/>
                <Field name="lastName" label="Last Name" type="text" component={renderField}/>
                <Field name="email" label="Email" type="email" component={renderField}/>
                <Field name="password" label="Password" type="password" component={renderField}/>
                <Field name="passwordConfirm" label="Confirm Password" type="password" component={renderField}/>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign Up!</button>
              </form>
            </Panel>
          </Col>
        </Row>
      </Grid>
	);
  }
}

// form validation rules
function validate(formProps) {
  const errors = {};
  if (!formProps.firstName) {
    errors.firstName = 'Please enter first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }
  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match';
  }

  return errors;
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

const SignUpForm = reduxForm({
  form: 'signup',
  validate
}, null, {signupUser})(Signup);

export default connect(mapStateToProps)(SignUpForm);
