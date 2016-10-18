import React, {Component, PropTypes} from 'react';
import {reduxForm, Field} from 'redux-form';
import {createTimesheet2} from '../actions/time.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';

class NewTimesheet2 extends Component {

  onSubmit(props) {
    console.log('props test', props);
    // this.props.createTimesheet(props);
    createTimesheet2(props);
    console.log('props test 2', props);
    this.context.router.push('/');
  }

  render() {
    const {handleSubmit} = this.props;
    console.log('this.props', this.props);
    // const {fields: {dateWorked, hoursWorked, workType}, handleSubmit} = this.props;
      // {fields: {dateWorked, hoursWorked, workType}, handleSubmit}
    // let thisWeek = 'test';
    // if (this.props.week) {
    //   thisWeek = this.props.week;
    // }

    const renderWeek = this.props;

    return (
      <div>

        <Grid>
          <Row>
            <Col md={12}>


              <h3>Timesheet</h3>

              <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <div>
                  <label>Pick a Week</label>
                  <div>
                    <Field name={renderWeek} component="select">
                      <option value="10/17/2016"/>
                      <option value="10/17/2016">Week of 10/17/2016</option>
                      <option value="10/24/2016">Week of 10/24/2016</option>
                      <option value="10/31/2016">Week of 10/31/2016</option>
                    </Field>
                  </div>
                </div>

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
                      <td><div><Field name={`${renderWeek}.Dev`} className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Tue-Dev" className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Wed-Dev" className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Thur-Dev" className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Fri-Dev" className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Sat-Dev" className="input-width" component="input" type="number"/></div></td>
                      <td><div><Field name="Sun-Dev" className="input-width" component="input" type="number"/></div></td>
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

// function validate(values) {
//   const errors = {};

//   if (!values.dateWorked) {
//     errors.dateWorked = 'Enter proper Date';
//   }
//   if (!values.hoursWorked) {
//     errors.hoursWorked = 'Enter a proper number';
//   }
//   if (!values.workType) {
//     errors.workType = 'Enter proper work type';
//   }

//   return errors;
// }

NewTimesheet2.propTypes = {
  // createTimesheet2: PropTypes.func,
  // fields: PropTypes.object,
  handleSubmit: PropTypes.func,
  week: PropTypes.string
};

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'TimesheetNewForm'
}, null, {createTimesheet2})(NewTimesheet2);


                // <div>
                //   <label>Pick a Week</label>
                //   <div>
                //     <Field name="week" component="select">
                //       <option value="10/17/2016"/>
                //       <option value="10/17/2016">Week of 10/17/2016</option>
                //       <option value="10/24/2016">Week of 10/24/2016</option>
                //       <option value="10/31/2016">Week of 10/31/2016</option>
                //     </Field>
                //   </div>
                // </div>