import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchTimesheetData} from '../actions/time.actions';
import {Link} from 'react-router';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import moment from 'moment';
const LineChart = require('react-chartjs').Line;
const BarChart = require('react-chartjs').Line;

class DashboardTest extends Component {
  componentWillMount() {
    this.props.fetchTimesheetData();
  }

  renderRows() {
    let count = 0;
    return this.props.sheets.map(data => {
      count++;
      // below constants convert date object into simple mm/dd/yyyy format

      return (
        <tr key={data._id}>
          <td>{count}</td>
          <td>
            <Link to={'user/' + data.userInfo.sub}>
              <strong>{data.userInfo.firstName} {data.userInfo.lastName}</strong>
            </Link>
          </td>
          <td>{moment(data.dateWorked).format('MM/DD/YYYY')}</td>
          <td>{data.admin}</td>
          <td>{data.dev}</td>
          <td>{data.qa}</td>
          <td>{data.rd}</td>
          <td>{data.other}</td>
        </tr>
      );
    });
  }

  render() {
    console.log('data', this.props.sheets);

    const chartOptions = {

      // Boolean - Whether grid lines are shown across the chart
      scaleShowGridLines: true,

      // String - Colour of the grid lines
      scaleGridLineColor: 'rgba(134, 121, 121, .2)',

      // Number - Width of the grid lines
      scaleGridLineWidth: 1,

      // Boolean - Whether to show horizontal lines (except X axis)
      scaleShowHorizontalLines: true,

      // Boolean - Whether to show vertical lines (except Y axis)
      scaleShowVerticalLines: true,

      // Boolean - Whether the line is curved between points
      bezierCurve: true,

      // Number - Tension of the bezier curve between points
      bezierCurveTension: 0.4,

      // Boolean - Whether to show a dot for each point
      pointDot: true,

      // Number - Radius of each point dot in pixels
      pointDotRadius: 4,

      // Number - Pixel width of point dot stroke
      pointDotStrokeWidth: 1,

      // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
      pointHitDetectionRadius: 20,

      // Boolean - Whether to show a stroke for datasets
      datasetStroke: true,

      // Number - Pixel width of dataset stroke
      datasetStrokeWidth: 2,

      // Boolean - Whether to fill the dataset with a colour
      datasetFill: true,

      // String - A legend template
      legendTemplate: "<ul className=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>",

      // Boolean - Whether to horizontally center the label and point dot inside the grid
      offsetGridLines: false
    };

    const chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(0, 64, 255,0.0)',
          strokeColor: 'rgba(0, 64, 255,1)',
          pointColor: 'rgba(0, 64, 255,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(0, 64, 255,1)',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          fillColor: 'rgba(255, 0, 0,0.0)',
          strokeColor: 'rgba(255, 0, 0,1)',
          pointColor: 'rgba(255, 0, 0,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(255, 0, 0,1)',
          data: [28, 48, 40, 19, 86, 27, 90]
        },
        {
          label: 'My Third dataset',
          fillColor: 'rgba(0, 255, 128,0.0)',
          strokeColor: 'rgba(0, 255, 128,1)',
          pointColor: 'rgba(0, 255, 128,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(0, 255, 128,1)',
          data: [15, 15, 35, 45, 55, 30, 20]
        },
        {
          label: 'My Fourth dataset',
          fillColor: 'rgba(134, 121, 121,0.0)',
          strokeColor: 'rgba(134, 121, 121,1)',
          pointColor: 'rgba(134, 121, 121,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(134, 121, 121,1)',
          data: [22, 22, 14, 25, 35, 28, 17]
        }
      ]
    };

    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>
            <h4>Average Hours Spent Working at Pixel Intel Inc.</h4>
            <LineChart data={chartData} options={chartOptions} width="600" height="250"/>

            <h3>Timesheet</h3>
            <Table responsive bordered condensed hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Date Worked</th>
                  <th>Admin</th>
                  <th>Dev Work</th>
                  <th>QA</th>
                  <th>R&D</th>
                  <th>R&D</th>
                </tr>
              </thead>
              <tbody>
                {this.renderRows()}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Grid>
    );
  }
}

DashboardTest.propTypes = {
  fetchTimesheetData: PropTypes.func,
  sheets: PropTypes.any
};

function mapStateToProps(state) {
  return {sheets: state.sheets.all};
}

export default connect(mapStateToProps, {fetchTimesheetData})(DashboardTest);
