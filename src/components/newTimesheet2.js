import React, {Component, PropTypes} from 'react';
import {reduxForm, initialize} from 'redux-form';
import {createTimesheet2, fetchTest, convertToDateString, convertToDate} from '../actions/time.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import {connect} from 'react-redux';

class NewTimesheet2 extends Component {
  componentWillMount() {
    this.props.fetchTest(this.props.params.id);
    setTimeout(console.log('test', this.props), 3000);
  }

  onSubmit(props) {
    console.log('onSubmit this.props.params.id', this.props.params.id);
    const dayOne = this.props.params.id;
    props.Mon.dateWorked = convertToDate(dayOne, 0);
    props.Tue.dateWorked = convertToDate(dayOne, 1);
    props.Wed.dateWorked = convertToDate(dayOne, 2);
    props.Thur.dateWorked = convertToDate(dayOne, 3);
    props.Fri.dateWorked = convertToDate(dayOne, 4);
    props.Sat.dateWorked = convertToDate(dayOne, 5);
    props.Sun.dateWorked = convertToDate(dayOne, 6);

    // console.log('props test', props);
    
    // {date, workType}
    // this.props.createTimesheet2(props);
    // console.log('props test 2', props);
    // this.context.router.push('/');

    this.props.fetchTest();
  }

  render() {
    console.log('this.props.', this.props.sheets[0]);

    // this.props.dispatch(initialize('TimesheetNewForm', {
    //   Mon: {monDev: '5', monQa: '6'}
    // }));

    const pickedString = convertToDateString(this.props.params.id);
    const {fields: {
      Mon: {monDev, monQa},
      Tue: {tueDev, tueQa},
      Wed: {wedDev, wedQa},
      Thur: {thurDev, thurQa},
      Fri: {friDev, friQa},
      Sat: {satDev, satQa},
      Sun: {sunDev, sunQa}
    }, handleSubmit} = this.props;

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
                      <td><input type="number" className="input-width" {...monDev}/></td>
                      <td><input type="number" className="input-width" {...tueDev}/></td>
                      <td><input type="number" className="input-width" {...wedDev}/></td>
                      <td><input type="number" className="input-width" {...thurDev}/></td>
                      <td><input type="number" className="input-width" {...friDev}/></td>
                      <td><input type="number" className="input-width" {...satDev}/></td>
                      <td><input type="number" className="input-width" {...sunDev}/></td>
                    </tr>
                    <tr>
                      <td><div className="workType-width">QA</div></td>
                      <td><input type="number" className="input-width" {...monQa}/></td>
                      <td><input type="number" className="input-width" {...tueQa}/></td>
                      <td><input type="number" className="input-width" {...wedQa}/></td>
                      <td><input type="number" className="input-width" {...thurQa}/></td>
                      <td><input type="number" className="input-width" {...friQa}/></td>
                      <td><input type="number" className="input-width" {...satQa}/></td>
                      <td><input type="number" className="input-width" {...sunQa}/></td>
                    </tr>
                  </tbody>
                </Table>
                <button type="submit">Submit</button>
              </form>
            </Col>
          </Row>
        </Grid>

      </div>
    );
  }
}

NewTimesheet2.contextTypes = {
  router: PropTypes.object
};

NewTimesheet2.propTypes = {
  // createTimesheet2: PropTypes.func,
  // fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  fields: PropTypes.object,
  params: PropTypes.object,
  fetchTest: PropTypes.func
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  return {sheets: state.sheets.test};
}

const TimesheetForm = reduxForm({
  form: 'TimesheetNewForm',
  fields: [
    'Mon.monDev', 'Tue.tueDev', 'Wed.wedDev', 'Thur.thurDev', 'Fri.friDev', 'Sat.satDev', 'Sun.sunDev',
    'Mon.monQa', 'Tue.tueQa', 'Wed.wedQa', 'Thur.thurQa', 'Fri.friQa', 'Sat.satQa', 'Sun.sunQa'
  ]
}, null, {createTimesheet2})(NewTimesheet2);

export default connect(mapStateToProps, {fetchTest})(TimesheetForm);
