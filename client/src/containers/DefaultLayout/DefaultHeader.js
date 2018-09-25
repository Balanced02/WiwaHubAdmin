import React, { Component } from "react";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from 'react-router-dom'
import PropTypes from "prop-types";

import {
  AppAsideToggler,
  AppHeaderDropdown,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";
import logo from "../../assets/img/brand/logo.svg";
import sygnet from "../../assets/img/brand/sygnet.svg";
import { connect } from "react-redux";

import { logout } from "../../actions/auth";

const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {

  logout() {
    this.props.dispatch(logout())
    window.location.reload()
  }
  
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 200, height: 50, alt: "WiwaHub Logo" }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: "WiwaHub Logo" }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink href="/">Dashboard</NavLink>
          </NavItem>
        </Nav>
        <Nav className="ml-auto" navbar>
          <AppHeaderDropdown direction="down">
            <DropdownToggle nav>
              <img
                src={"assets/img/avatars/6.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right style={{ right: "auto" }}>
              <DropdownItem>
                <Link to='/productList' >
                <i className="fa fa-bell-o" /> Product List <Badge color="info">
                  42
                </Badge>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to='/addProduct' >
                <i className="fa fa-envelope-o" /> Add Product <Badge color="success">
                  42
                </Badge>
                </Link>
              </DropdownItem>
              <DropdownItem>
                <Link to='/myAds' >
                <i className="fa fa-tasks" /> My Ads <Badge color="danger">
                  42
                </Badge>
                </Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => this.logout()}>
                <i className="fa fa-lock" /> Logout
              </DropdownItem>
            </DropdownMenu>
          </AppHeaderDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default connect()(DefaultHeader);
