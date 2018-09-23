import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { startRegister } from "../../../actions/auth";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row, 
  Label
} from "reactstrap";
import { showError } from "../../../actions/feedback";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userDetails: {
        username: "",
        password: "",
        passwordC: "",
        email: "",
        phoneNumber: "",
        userType: "user",
        agree: false,
      }
    };
  }

  submit() {
    const {
      username,
      password,
      passwordC,
      email,
      phoneNumber,
      agree
    } = this.state.userDetails;
    if (!username)
      return this.props.dispatch(showError("Username field is required"));
    if (!email) return this.props.dispatch(showError("Email is required"));
    if (!phoneNumber)
      return this.props.dispatch(showError("Phone Number is required"));
    if (!password)
      return this.props.dispatch(showError("Please provide a password"));
    if (!passwordC)
      return this.props.dispatch(showError("Please confirm your password"));
    if (password !== passwordC)
      return this.props.dispatch(showError("Passwords do not match"));
    if (!agree)
      return this.props.dispatch(showError("You must agree with terms and conditions"));
    this.props.dispatch(startRegister(this.state.userDetails));
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      ...this.state,
      userDetails: {
        ...this.state.userDetails,
        [name]: value
      }
    });
  }

  handleCheckChange(e) {
    this.setState({
      ...this.state,
      userDetails: {
        ...this.state.userDetails,
        agree: !this.state.userDetails.agree
      }
    })
  }

  handleNumberInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    if (value.match(/^\d+$/) || value === "") {
      this.setState({
        ...this.state,
        userDetails: {
          ...this.state.userDetails,
          phoneNumber: value
        }
      });
    }
  };

  render() {
    const {
      username,
      password,
      passwordC,
      email,
      phoneNumber,
      agree,
    } = this.state.userDetails;
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      name="username"
                      onChange={e => this.handleInputChange(e)}
                      value={username}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Email"
                      name="email"
                      onChange={e => this.handleInputChange(e)}
                      value={email}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-phone" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      name="phoneNumber"
                      onChange={e => this.handleNumberInputChange(e)}
                      value={phoneNumber}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={e => this.handleInputChange(e)}
                      value={password}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      name="passwordC"
                      onChange={e => this.handleInputChange(e)}
                      value={passwordC}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4" style={{ marginLeft: 20 }} >
                    <Label check>
                      <Input type="checkbox" checked={agree} onChange={e => this.handleCheckChange(e)} /> I agree to the terms and condition of using this service
                    </Label>
                  </InputGroup>
                  <Button color="success" block onClick={() => this.submit()}>
                    Create Account
                  </Button>
                </CardBody>
                <CardFooter className="p-4">
                <Link to="/aboutUs">
                    {" "}
                    <Button color="link" block>
                      Terms and Conditions
                    </Button>
                  </Link>
                  <Link to="/login">
                    {" "}
                    <Button color="outline link" block>
                      Back to Login
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(Register);
