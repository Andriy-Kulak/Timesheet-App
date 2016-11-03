import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';
import {parseJwt} from '../actions/auth.actions';

import {
  Nav,
  NavItem,
  Navbar
} from 'react-bootstrap';

class NavBar extends Component {

  render() {
    const {authenticated} = this.props;
    const userToken = localStorage.getItem('token');
    const userInfo = parseJwt(userToken);

    return (
      <Navbar className="react-navbar" inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Timesheet App</a>
          </Navbar.Brand>
          <Navbar.Toggle/>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <IndexLinkContainer to="/">
              <NavItem className="nav-link" eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
            <LinkContainer to={{pathname: `/chart/${userInfo.sub}`}}>
              <NavItem className="nav-link" eventKey={3}>Dashboard</NavItem>
            </LinkContainer>
            <LinkContainer to={{pathname: `/user/${userInfo.sub}`}}>
              <NavItem className="nav-link" eventKey={3}>My Summary</NavItem>
            </LinkContainer>
            <LinkContainer to="/timesheet/">
              <NavItem className="nav-link" eventKey={2}>My Timesheet</NavItem>
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
  authenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, null, null, {pure: false})(NavBar);
