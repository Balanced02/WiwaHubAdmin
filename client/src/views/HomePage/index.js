import React, { Component } from 'react';
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardSubtitle,
  Button,
  CardHeader,
  CardFooter,
  CardImg,
} from 'reactstrap';
import WiwaHubLogo from '../../assets/img/WIWA3.jpg';
import { Link } from 'react-router-dom';
import LandingPageLogo from '../../assets/img/landingPage2.jpg';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { activeIndex } = this.state;

    return (
      <Card
        style={{
          backgroundImage: `url(${LandingPageLogo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          marginBottom: 0,
        }}
      >
        <CardHeader
          style={{
            background: 'transparent',
            padding: '10',
            border: 'none',
          }}
        >
          <CardTitle
            style={{
              padding: 40,
              color: 'white',
              fontSize: '500%',
              textAlign: 'center',
            }}
          >
            <b style={{ fontFamily: 'Lobster' }}>Wiwa</b>
          </CardTitle>
        </CardHeader>

        <CardFooter
          style={{
            flex: 1,
            flexDirection: 'column',
            border: 'none',
            background: 'transparent',
            marginBottom: '70px',
            position: 'absolute',
            bottom: '0',
            width: '100%',
            height: '60px',
          }}
        >
          <Link to="/register">
            <Button
              color="warning"
              style={{
                margin: 'auto',
                width: '50%',
                padding: '10px',
              }}
            >
              SIGN UP
            </Button>
          </Link>
          <Link to="/login">
            <Button
              color="success"
              style={{
                margin: 'auto',
                width: '50%',
                padding: '10px',
              }}
            >
              LOG IN
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
}

export default Example;
