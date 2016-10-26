import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet2, fetchTest, convertToDateString, convertToDate} from '../actions/time.actions';
import {parseJwt} from '../actions/auth.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

class NewTimesheet3 extends Component {
  componentWillUpdate(nextProps, nextState) {
    console.log('nextParams', nextProps.params.id);
    console.log('nextState', nextState);
    console.log('this.props.params.id)', this.props.params.id);

    fetchTest(nextProps.params.id);
    // this.setState({
    //   initialValues: {mon: 99}
    // });
    console.log('current not timeout PROPS', this.props);
  }

  onSubmit(props) {
    // console.log('onSubmit this.props.params.id', this.props.params.id);
    const dayOne = this.props.params.id;

    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);

    // console.log('on submit', props);
    if (!props.mon._id || !props.tue._id || !props.wed._id || !props.thur._id || !props.fri._id || !props.sat._id || !props.sun._id) {
      console.log('userInfo exits');
      props.mon.userInfo = userInfo;
      props.tue.userInfo = userInfo;
      props.wed.userInfo = userInfo;
      props.thur.userInfo = userInfo;
      props.fri.userInfo = userInfo;
      props.sat.userInfo = userInfo;
      props.sun.userInfo = userInfo;

      props.mon.dateWorked = convertToDate(dayOne, 0);
      props.tue.dateWorked = convertToDate(dayOne, 1);
      props.wed.dateWorked = convertToDate(dayOne, 2);
      props.thur.dateWorked = convertToDate(dayOne, 3);
      props.fri.dateWorked = convertToDate(dayOne, 4);
      props.sat.dateWorked = convertToDate(dayOne, 5);
      props.sun.dateWorked = convertToDate(dayOne, 6);
    }

    // console.log('on submit', props);

    createTimesheet2(props);
  }

  render() {
    // console.log('this.props.', this.props);
    console.log('this props in render', this.props);
    const pickedString = convertToDateString(this.props.params.id);
    const {handleSubmit, reset} = this.props;

    return (
      <div>
        <Grid>
          <Row>
            <Col md={12}>

              <h4><b>Timesheet:</b> <i>for the week of {pickedString}</i></h4>
              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Table responsive bordered condensed hover className="input-width" type="number">
                  <thead>
                    <tr>
                      <th>Work Type</th>
                      <th>Mon</th>
                      <th>Tue</th>
                      <th>Wed</th>
                      <th>Thur</th>
                      <th>Fri</th>
                      <th>Sat</th>
                      <th>Sun</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><div className="workType-width">Client App Dev.</div></td>
                      <td><Field name="mon.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="tue.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="wed.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="thur.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="fri.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sat.dev" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sun.dev" type="number" component="input" className="input-width"/></td>
                    </tr>
                    <tr>
                      <td><div className="workType-width">QA</div></td>
                      <td><Field name="mon.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="tue.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="wed.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="thur.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="fri.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sat.qa" type="number" component="input" className="input-width"/></td>
                      <td><Field name="sun.qa" type="number" component="input" className="input-width"/></td>
                    </tr>
                  </tbody>
                </Table>
                <button type="submit">Submit</button>
                <button type="button" onClick={reset}>Undo Changes</button>
              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

NewTimesheet3.contextTypes = {
  router: PropTypes.object
};

NewTimesheet3.propTypes = {
  handleSubmit: PropTypes.func,
  params: PropTypes.object
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  if ((state.sheets.test.length > 0)) { // wait until state.sheets.test has a value
    console.log('sheets test', state.sheets.test);
    return {
      sheets: state.sheets.test,
      initialValues: {
        mon: state.sheets.test[0],
        tue: state.sheets.test[1],
        wed: state.sheets.test[2],
        thur: state.sheets.test[3],
        fri: state.sheets.test[4],
        sat: state.sheets.test[5],
        sun: state.sheets.test[6]
      }
    };
  }
  return {};
}

const TimesheetForm = reduxForm({
  form: 'TimesheetNewForm',
  enableReinitialize: true
}
, null, {createTimesheet2})(NewTimesheet3);

export default connect(mapStateToProps, {fetchTest})(TimesheetForm);
