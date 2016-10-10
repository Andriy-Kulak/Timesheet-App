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
    console.log('test', this.props);
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
            <LinkContainer to="user/Andriy">
              <NavItem className="nav-link" eventKey={3}>Andriy Time</NavItem>
            </LinkContainer>
            <LinkContainer to="/signin">
              <NavItem className="nav-link" EventKey={1}>Sign In</NavItem>
            </LinkContainer>
            <LinkContainer to="/signup">
              <NavItem className="nav-link" EventKey={2}>Sign Up</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
