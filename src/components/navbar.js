import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';

class NavBar extends Component {

  render() {
    const {authenticated} = this.props;
    let {userInfo} = this.props;
    if (!userInfo) {
      userInfo = [];
    }
    console.log('this props', userInfo);
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
            <LinkContainer to="/3">
              <NavItem className="nav-link" eventKey={10}>Hello {userInfo.firstName}</NavItem>
            </LinkContainer>
            <IndexLinkContainer to="/">
              <NavItem className="nav-link" eventKey={1}>Dashboard</NavItem>
            </IndexLinkContainer>
            <LinkContainer to="/timesheet/new">
              <NavItem className="nav-link" eventKey={2}>Submit Time</NavItem>
            </LinkContainer>
            <LinkContainer to="/user/Andriy">
              <NavItem className="nav-link" eventKey={3}>Andriy Time</NavItem>
            </LinkContainer>
            {authenticated &&
              <LinkContainer to="/signout">
                <NavItem className="nav-link" eventKey={4}>Sign Out</NavItem>
              </LinkContainer>}
            {!authenticated &&
              <LinkContainer to="/signin">
                <NavItem className="nav-link" eventKey={5}>Sign In</NavItem>
              </LinkContainer>}
            {!authenticated &&
              <LinkContainer to="/signup">
                <NavItem className="nav-link">Sign Up</NavItem>
              </LinkContainer>}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

NavBar.propTypes = {
  authenticated: PropTypes.bool,
  userInfo: PropTypes.object
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    userInfo: state.auth.userInfo
  };
}

export default connect(mapStateToProps)(NavBar);
