import React, {Component, PropTypes} from 'react';
import {reduxForm, Field, getFormValues, reset} from 'redux-form';
import {createTimesheet, fetchTimehsheet, convertToDateString, convertToDate} from '../../actions/time.actions';
import {parseJwt} from '../../actions/auth.actions';
import {Table, Panel} from 'react-bootstrap';
import {connect} from 'react-redux';
import {store} from '../../index';

class Timesheet extends Component {
  componentDidMount() {
    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken); // gets userID
    fetchTimehsheet(this.props.params.id, userInfo);
    // this.setState({sheets: 'test'});
  }

  componentWillReceiveProps(nextProps) {
    console.log('next vs this', nextProps.params.id, this.props.params.id);
    if (nextProps.params.id !== this.props.params.id) {
      store.dispatch(reset('TimesheetNewForm'));
      const userToken = localStorage.getItem('token');
      const userInfo = parseJwt(userToken); // gets userID
      fetchTimehsheet(nextProps.params.id, userInfo);
      console.log('receive Props');
    }
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
    console.log('in component', props);
    createTimesheet(props);
  }

  render() {
    // console.log('this.props.', this.props);
    const pickedString = convertToDateString(this.props.params.id);
    const {handleSubmit, reset, submitting} = this.props;
    console.log('props', this.props);
    const title = (
      <h4 className="header-panel"><b>Timesheet:</b> <i>for the week of {pickedString}</i></h4>
    );

    return (
      <Panel key={this.props.params.id} header={title} bsStyle="info">
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
                <td><Field name="mon.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="tue.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="wed.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="thur.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="fri.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="sat.dev" type="number" component="input" required className="input-width"/></td>
                <td><Field name="sun.dev" type="number" component="input" required className="input-width"/></td>
              </tr>
              <tr>
                <td><div className="workType-width">QA</div></td>
                <td><Field name="mon.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="tue.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="wed.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="thur.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="fri.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="sat.qa" type="number" component="input" required className="input-width"/></td>
                <td><Field name="sun.qa" type="number" component="input" required className="input-width"/></td>
              </tr>
              <tr>
                <td><div className="workType-width">Admin</div></td>
                <td><Field name="mon.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="tue.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="wed.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="thur.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="fri.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="sat.admin" type="number" component="input" className="input-width"/></td>
                <td><Field name="sun.admin" type="number" component="input" className="input-width"/></td>
              </tr>
              <tr>
                <td><div className="workType-width">R&D</div></td>
                <td><Field name="mon.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="tue.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="wed.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="thur.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="fri.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="sat.rd" type="number" component="input" className="input-width"/></td>
                <td><Field name="sun.rd" type="number" component="input" className="input-width"/></td>
              </tr>
              <tr>
                <td><div className="workType-width">Other</div></td>
                <td><Field name="mon.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="tue.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="wed.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="thur.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="fri.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="sat.other" type="number" component="input" className="input-width"/></td>
                <td><Field name="sun.other" type="number" component="input" className="input-width"/></td>
              </tr>
            </tbody>
          </Table>
          <button type="submit" disabled={submitting} className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-warning" onClick={reset}>Undo Changes</button>
        </form>
      </Panel>
    );
  }
}

Timesheet.contextTypes = {
  router: PropTypes.object
};

Timesheet.propTypes = {
  handleSubmit: PropTypes.func,
  params: PropTypes.object,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  console.log('sheets data in state', state.sheets);
  if ((state.sheets.data.length > 0)) { // wait until state.sheets.data has a value
    return {
      sheets: state.sheets.data,
      values: getFormValues('TimesheetNewForm')(state),
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
