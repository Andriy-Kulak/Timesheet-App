import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {signinUser} from '../../actions/auth.actions';
import {connect} from 'react-redux';
import {Grid, Col, Row} from 'react-bootstrap';

class Signin extends Component {
	// used to take supplied inputs and check auth
  handleFormSubmit({email, password}) {
		// Need something to log user in
    console.log('test', email, password);
    signinUser(email, password);
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
    const {handleSubmit} = this.props;

    return (
      <Grid>
        <Row>
          <Col mdOffset={4} md={4}>
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <fieldset className="form-group">
                <label>Email:</label>
                <Field name="email" component="input" type="text" required className="form-control"/>
              </fieldset>
              <fieldset className="form-group">
                <label>Password:</label>
                <Field name="password" component="input" type="password" required className="form-control"/>
              </fieldset>
              {this.renderAlert()}
              <button action="submit" className="btn btn-primary">Sign in</button>
            </form>
          </Col>
        </Row>
      </Grid>
	);
  }
}

Signin.propTypes = {
  errorMessage: PropTypes.string,
  handleSubmit: PropTypes.func
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error};
}

const SigninForm = reduxForm({
  form: 'signin'
}, null, {signinUser})(Signin);

export default connect(mapStateToProps)(SigninForm);
