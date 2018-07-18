import React, { Component } from "react";
import { Card, Row, Col, CardBody } from "reactstrap";
import { connect } from "react-redux";
import { callApi, picUpload } from "../../../utils/index";
import { showError, showInfo } from "../../../actions/feedback";
import Prompt from "../../../components/Prompt";
import AddProduct from '../../../components/NewProduct'
import ProductDetails from '../../../components/ProductDetails'

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
      imageUrl: '',
      inputs: { negotiable: true }
    };
  }

  onImageDrop(files) {
    this.setState({
      ...this.state,
      uploadFile: files[0],
      uploading: true,
    });
    this.viewfile(files[0]);
  }

  viewfile(file) {
    var reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        uploading: false,
        imageUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }

  changeImage() {
    this.setState({
      ...this.state,
      uploadFile: '',
      uploading: false,
      imageUrl: '',
    });
  }

  handleInputChange(e){
    let { name, value } = e.target
    let expectedInputs = {
      ...this.state.inputs,
        [name]: value,
    }
    if (name === 'state') {
      expectedInputs = {
        ...expectedInputs,
        localGovtArea: ''
      }
    } 
    this.setState({
      ...this.state,
      inputs: {
        ...expectedInputs
      }
    })
  }

  handleNumberInputChange = (event) => {
    event.preventDefault();
    const { value } = event.target;
    if (value.match(/^\d+$/) || value === '') {
      this.setState({
        ...this.state,
        inputs: {
          ...this.state.inputs,
          price: value
        }
      })
    }
  }

  handleSwitchChange = (type) => {
    this.setState({
      ...this.state,
      inputs: {
        ...this.state.inputs,
        negotiable: type === 'negotiable'
      }
    })
  }

  submit(){
    let check = Object.values(this.state.inputs);
    check = check.every(data => data !== '');
    if (!check) {
      this.props.dispatch(showError('All fields must be filled'));
      return;
    } else {
          picUpload(this.state.uploadFile, 'logos')
            .then(({url, fileName}) => {
              this.setState({
                imageUrl: url,
                uploading: false,
                inputs: {
                  ...this.state.inputs,
                  product: url,
                  picName: fileName
                },
              });
              this.createProduct();
            })
            .catch(err => {
              this.props.dispatch(showError('Error Uploading Image'));
            });
      }
    }

    createProduct(){
      callApi('/createProduct', this.state.inputs, 'POST').then(data => {
        this.props.dispatch(showInfo('Ad Successfully Posted'))
        this.resetState()
      })
    }

    resetState(){
      const resetState = {
        collapse: true,
      fadeIn: true,
      timeout: 300,
      uploadFile: null,
      uploading: false,
      imageUrl: '',
      inputs: {}
      }
      this.setState({
        ...resetState
      })
    }


  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  render() {
    const { imageUrl, uploading, inputs } = this.state
    return (
      <div className="animated fadeIn">
        <Card>
          <CardBody>
          <Row>
            <Col xs="12" sm="6" md="4"  >
            <AddProduct submit ={() => this.submit()} uploading={uploading} image={imageUrl} changeImage={() => this.changeImage()} onImageDrop = {file => this.onImageDrop(file)} />
            </Col>
            <Col>
            <ProductDetails data={inputs} handleInputChange={e => this.handleInputChange(e)} submit={() => this.submit()} handleNumberInputChange={e => this.handleNumberInputChange(e)} handleSwitchChange={e => this.handleSwitchChange(e)} />
            </Col>
          </Row>
          </CardBody>
          </Card>
      </div>
    );
  }
}

export default connect()(NewProduct);
