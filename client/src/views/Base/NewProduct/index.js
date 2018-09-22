import React, { Component } from "react";
import { Card, Row, Col, CardBody, CardFooter } from "reactstrap";
import { connect } from "react-redux";
import { callApiWithFormData } from "../../../utils/index";
import { showError, showInfo } from "../../../actions/feedback";
import AddProduct from "../../../components/NewProduct";
import ProductDetails from "../../../components/ProductDetails";

class NewProduct extends Component {
  constructor(props) {
    super(props);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      uploadFile: null,
      uploading: false,
      imageUrl: "",
      inputs: {
        negotiable: true,
        price: "",
        title: "",
        state: "",
        localGovtArea: ""
      },
      fetching: false,
      blocking: true,
      user: this.props.user
        ? this.props.user.userType
          ? this.props.user
          : this.props.user._doc
        : ""
    };
  }

  onImageDrop(files) {
    this.setState({
      ...this.state,
      uploadFile: files[0],
      uploading: true
    });
    this.viewfile(files[0]);
  }

  viewfile(file) {
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        uploading: false,
        imageUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  changeImage() {
    this.setState({
      ...this.state,
      uploadFile: "",
      uploading: false,
      imageUrl: ""
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    let expectedInputs = {
      ...this.state.inputs,
      [name]: value
    };
    if (name === "state") {
      expectedInputs = {
        ...expectedInputs,
        localGovtArea: ""
      };
    }
    this.setState({
      ...this.state,
      inputs: {
        ...expectedInputs
      }
    });
  }

  handleNumberInputChange = event => {
    event.preventDefault();
    const { value } = event.target;
    if (value.match(/^\d+$/) || value === "") {
      this.setState({
        ...this.state,
        inputs: {
          ...this.state.inputs,
          price: value
        }
      });
    }
  };

  handleSwitchChange = type => {
    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        negotiable: type === "negotiable"
      }
    });
  };

  clearFetching() {
    this.setState({
      ...this.state,
      fetching: false
    });
  }

  submit() {
    let check = Object.values(this.state.inputs);
    check = check.every(data => data !== "");
    if (!check) {
      this.props.dispatch(showError("All fields must be filled"));
      return;
    }
    if (!this.state.uploadFile) {
      this.props.dispatch(showError("You must upload an image"));
      return;
    } else {
      this.setState({
        ...this.state,
        fetching: true
      });
      callApiWithFormData(
        "/createProduct",
        this.state.inputs,
        "POST",
        this.state.uploadFile
      )
        .then(data => {
          this.props.dispatch(showInfo("Ad Successfully Posted"));
          this.clearFetching();
          this.resetState();
        })
        .catch(err => {
          this.props.dispatch(showError("Error Uploading Image"));
          this.clearFetching();
        });
    }
  }

  resetState() {
    const resetState = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      uploadFile: null,
      uploading: false,
      imageUrl: "",
      inputs: {
        negotiable: true,
        price: "",
        title: "",
        state: "",
        localGovtArea: ""
      }
    };
    this.setState({
      ...resetState
    });
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    const { imageUrl, uploading, inputs, fetching, user } = this.state;
    return (
        <div className="animated fadeIn">
          <Card>
            <CardBody>
                { user.verified ? 
              <Row>
                <Col xs="12" sm="6" md="4">
                  <AddProduct
                    uploading={uploading}
                    image={imageUrl}
                    changeImage={() => this.changeImage()}
                    onImageDrop={file => this.onImageDrop(file)}
                    />
                </Col>
                <Col>
                  <ProductDetails
                    data={inputs}
                    handleInputChange={e => this.handleInputChange(e)}
                    submit={() => this.submit()}
                    handleNumberInputChange={e =>
                      this.handleNumberInputChange(e)
                    }
                    handleSwitchChange={e => this.handleSwitchChange(e)}
                    fetching={fetching}
                    />
                </Col>
              </Row>
            : <div>You need to be verified to post adverts. Please contact any of the admin to be verified (WhatsApp Only)
              <CardFooter>
                <a href="https://api.whatsapp.com/send?phone=2348164537667" > Josh <i className="fa fa-whatsapp" style={{ fill: 'green' }} /> 08164537667 </a>
              </CardFooter>
            </div> }
            </CardBody>
          </Card>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  };
};

export default connect(mapStateToProps)(NewProduct);
