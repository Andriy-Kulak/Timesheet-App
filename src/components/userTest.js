import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchUserData} from '../actions/time.actions';
import {Table, Grid, Col, Row} from 'react-bootstrap';
import moment from 'moment';
const LineChart = require('react-chartjs').Line;
const BarChart = require('react-chartjs').Line;
import {parseJwt} from '../actions/auth.actions';
import _ from 'lodash';

class UserTest extends Component {

  componentWillMount() {
    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);
    console.log('userInfo', userInfo);
    this.props.fetchUserData(userInfo.sub);
  }

  renderRows() {
    return this.props.time.map(data => {
      return (
        <tr key={data._id}>
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
    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);
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

    const devArray = [];
    const qaArray = [];
    const rdArray = [];
    const adminArray = [];
    const otherArray = [];
    const datesArray = [];
    const totalArray = [];

    const {time} = this.props;
    console.log('time', time);
    if (!time) {
      return <div>Loading...</div>;
    }

    if (time) {
      time.map(obj => {
        devArray.push(obj.dev);
        qaArray.push(obj.qa);
        rdArray.push(obj.rd);
        adminArray.push(obj.admin);
        otherArray.push(obj.other);
        totalArray.push(obj.total);
        datesArray.push('Week of ' + moment(obj.weekOf).format('MM/DD/YYYY'));
        // datesArray.push(moment(obj.dateWorked).format('MM/DD/YYY'));
        return obj;
      });
    }
    console.log('1', devArray);
    console.log('2', rdArray);
    console.log('3', qaArray);
    console.log('4', adminArray);
    console.log('5', otherArray);
    console.log('6', datesArray);
    console.log('6', totalArray);

    const chartData = {
      labels: datesArray,
      datasets: [
        {
          label: 'Dev Work',
          fillColor: 'rgba(0, 64, 255,0.0)',
          strokeColor: 'rgba(0, 64, 255,1)',
          pointColor: 'rgba(0, 64, 255,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(0, 64, 255,1)',
          data: devArray
        },
        {
          label: 'QA',
          fillColor: 'rgba(255, 0, 0,0.0)',
          strokeColor: 'rgba(255, 0, 0,1)',
          pointColor: 'rgba(255, 0, 0,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(255, 0, 0,1)',
          data: qaArray
        },
        {
          label: 'Research & Development',
          fillColor: 'rgba(0, 255, 128,0.0)',
          strokeColor: 'rgba(0, 255, 128,1)',
          pointColor: 'rgba(0, 255, 128,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(0, 255, 128,1)',
          data: rdArray
        },
        {
          label: 'Admin',
          fillColor: 'rgba(134, 121, 121,0.0)',
          strokeColor: 'rgba(134, 121, 121,1)',
          pointColor: 'rgba(134, 121, 121,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(134, 121, 121,1)',
          data: adminArray
        },
        {
          label: 'Total',
          fillColor: 'rgba(134, 121, 121,0.0)',
          strokeColor: 'rgba(134, 121, 121,1)',
          pointColor: 'rgba(134, 121, 121,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(134, 121, 121,1)',
          data: totalArray
        }
      ]
    };

    return (
      <Grid>
        <Row>
          <Col mdOffset={2} md={8}>

            <h4>Average Hours Spent Working at Pixel Intel Inc.</h4>
            <LineChart data={chartData} options={chartOptions} width="600" height="250"/>

            <Table responsive bordered condensed hover>
              <thead>
                <tr>
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

function mapStateToProps(state) {
  return {time: state.sheets.user};
}

UserTest.propTypes = {
  time: PropTypes.array,
  fetchUserData: PropTypes.func,
  params: PropTypes.object
};

export default connect(mapStateToProps, {fetchUserData})(UserTest);