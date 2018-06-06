import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { startRegister } from '../../../actions/auth'

import { Button, Card, CardBody, CardFooter, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { showError } from '../../../actions/feedback';

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      userDetails: {
        username: '',
        password: '',
        passwordC: '',
        email: '',
        userType: 'admin',
      }
    }
  }

  submit(){
    const { username, password, passwordC, email } = this.state.userDetails
    if (!username) return this.props.dispatch(showError('Username field is required'))
    if (!email) return this.props.dispatch(showError('Email is required'))
    if (!password) return this.props.dispatch(showError('Please provide a password'))
    if (!passwordC) return this.props.dispatch(showError('Please confirm your password'))
    if (password !== passwordC) return this.props.dispatch(showError('Passwords do not match'))
    this.props.dispatch(startRegister(this.state.userDetails))
  }

  handleInputChange(e){
    let { name, value } = e.target
    this.setState({
      ...this.state,
      userDetails: {
        ...this.state.userDetails,
        [name] : value
      }
    })
  }

  render() {
    const { username, password, passwordC, email } = this.state.userDetails
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
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Username" name='username' onChange={(e) => this.handleInputChange(e)} value={username} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" placeholder="Email" name='email' onChange={(e) => this.handleInputChange(e)} value={email} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Password" name='password' onChange={(e) => this.handleInputChange(e)} value={password}/>
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" placeholder="Repeat password" name='passwordC' onChange={(e) => this.handleInputChange(e)} value={passwordC} />
                  </InputGroup>
                  <Button color="success" block onClick={() => this.submit()} >Create Account</Button>
                </CardBody>
                <CardFooter className="p-4">
                <Link to='/login'> <Button color="primary" block >Login</Button></Link>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default connect()(Register)
