import React, {Component} from 'react';
import {Table} from 'react-bootstrap';

export default class Legend extends Component {
  render() {
    return (
      <div>
        <h5 className="legend-header">Legend</h5>
        <Table responsive bordered condensed hover>
          <thead>
            <tr>
              <th className="legend-subHeader">Color</th>
              <th className="legend-subHeader">Work Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="black-color"/>
              <td className="legend-text">Total</td>
            </tr>
            <tr>
              <td className="green-color"/>
              <td className="legend-text">R & D</td>
            </tr>
            <tr>
              <td className="red-color"/>
              <td className="legend-text">Q & A</td>
            </tr>
            <tr>
              <td className="blue-color"/>
              <td className="legend-text">Dev Work</td>
            </tr>
            <tr>
              <td className="purple-color"/>
              <td className="legend-text">Admin</td>
            </tr>
            <tr>
              <td className="grey-color"/>
              <td className="legend-text">Other</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  }
}
