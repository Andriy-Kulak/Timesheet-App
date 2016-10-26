import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet, fetchTimehsheet, convertToDateString, convertToDate} from '../actions/time.actions';
import {parseJwt} from '../actions/auth.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

class Timesheet extends Component {
  componentDidMount() {
    fetchTimehsheet(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    fetchTimehsheet(nextProps.params.id);
  }

  onSubmit(props) {
    const dayOne = this.props.params.id;

    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);

    // console.log('on submit', props);
    if (!props.mon._id || !props.tue._id || !props.wed._id || !props.thur._id || !props.fri._id || !props.sat._id || !props.sun._id) {
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

    createTimesheet(props);
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
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn btn-warning" onClick={reset}>Undo Changes</button>
              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

Timesheet.contextTypes = {
  router: PropTypes.object
};

Timesheet.propTypes = {
  handleSubmit: PropTypes.func,
  params: PropTypes.object,
  reset: PropTypes.func
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  if ((state.sheets.data.length > 0)) { // wait until state.sheets.data has a value
    return {
      sheets: state.sheets.data,
      initialValues: {
        mon: state.sheets.data[0],
        tue: state.sheets.data[1],
        wed: state.sheets.data[2],
        thur: state.sheets.data[3],
        fri: state.sheets.data[4],
        sat: state.sheets.data[5],
        sun: state.sheets.data[6]
      }
    };
  }
  return {};
}

const TimesheetForm = reduxForm({
  form: 'TimesheetNewForm',
  enableReinitialize: true
}
, null, {createTimesheet})(Timesheet);

export default connect(mapStateToProps, {fetchTimehsheet})(TimesheetForm);
