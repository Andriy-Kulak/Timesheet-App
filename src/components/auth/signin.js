import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import * as actions from '../../actions/auth.actions';

class Signin extends Component {
	// used to take supplied inputs and check auth
  handleFormSubmit({email, password}) {
		// Need something to log user in
    this.props.signinUser({email, password});
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
	// handleSubmit is a built in redux-form helper to bind ui to values
    const {handleSubmit, fields: {email, password}} = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <input {...email} type="text" required className="form-control"/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <input {...password} type="password" required className="form-control"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
	);
  }
}

Signin.propTypes = {
  signinUser: PropTypes.func,
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

export default reduxForm({
  form: 'signin',
  fields: ['email', 'password']
}, mapStateToProps, actions)(Signin);
