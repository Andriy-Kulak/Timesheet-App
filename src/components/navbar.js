import React, {Component} from 'react';
// import {connect} from 'react-redux';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';

class NavBar extends Component {

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Timesheet App</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem className="nav-link" eventKey={1}>Dashboard</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="timesheet/new">
              <NavItem className="nav-link" eventKey={2}>Submit Time</NavItem>
            </LinkContainer>
            <LinkContainer to="user/2">
              <NavItem className="nav-link" eventKey={3}>Andriy Time</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
// ReactDOM.render(navInstance, mountNode);

      // <Navbar>
      //   <Navbar.Header>
      //     <Navbar.Brand>
      //       <a href="#">React-Bootstrap</a>
      //     </Navbar.Brand>
      //     <Navbar.Toggle/>
      //   </Navbar.Header>
      //   <Navbar.Collapse>
      //     <Nav>
      //       <NavItem eventKey={1} href="/">Home</NavItem>
      //       <NavItem eventKey={2} href="timesheet/new">New Timesheet</NavItem>
      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>
