import React, {Component, PropTypes} from 'react';
import {reduxForm} from 'redux-form';
import {createTimesheet2} from '../actions/time.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';

class NewTimesheet2 extends Component {

  onSubmit(props) {
    console.log('onSubmit this.props.params.id', this.props.params.id);
    props.pickedWeek = this.convertToDate(this.props.params.id);
    const dayOne = this.props.params.id;
    props.Mon.dateWorked = this.convertToDate(dayOne, 0);
    props.Tue.dateWorked = this.convertToDate(dayOne, 1);
    props.Wed.dateWorked = this.convertToDate(dayOne, 2);
    props.Thur.dateWorked = this.convertToDate(dayOne, 3);
    props.Fri.dateWorked = this.convertToDate(dayOne, 4);
    props.Sat.dateWorked = this.convertToDate(dayOne, 5);
    props.Sun.dateWorked = this.convertToDate(dayOne, 6);

    console.log('props test', props);

    // {date, workType}
    this.props.createTimesheet2(props);
    createTimesheet2(props);
    console.log('props test 2', props);
    this.context.router.push('/');
  }

  convertToDate(string, addDays) {
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const day = Number(string.substring(6, 8));
    return new Date(year, month - 1, day + addDays);
  }

  converToDateString(string) {
    const year = string.substring(0, 4);
    const month = string.substring(4, 6);
    const day = string.substring(6, 8);
    return month + '/' + day + '/' + year;
  }

  render() {
    const pickedString = this.converToDateString(this.props.params.id);
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
  createTimesheet2: PropTypes.func,
  params: PropTypes.object
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

export default reduxForm({
  form: 'TimesheetNewForm',
  fields: [
    'Mon.monDev', 'Tue.tueDev', 'Wed.wedDev', 'Thur.thurDev', 'Fri.friDev', 'Sat.satDev', 'Sun.sunDev',
    'Mon.monQa', 'Tue.tueQa', 'Wed.wedQa', 'Thur.thurQa', 'Fri.friQa', 'Sat.satQa', 'Sun.sunQa'
  ]
}, null, {createTimesheet2})(NewTimesheet2);
