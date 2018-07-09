import React, { Component } from "react";
import { Row } from "reactstrap";
import { connect } from "react-redux";
import ProductList from "../../../components/ProductList";
import { callApi } from "../../../utils/index";
import { showError, showInfo } from "../../../actions/feedback";
import Prompt from "../../../components/Prompt";

class Cards extends Component {
  constructor(props) {
    super(props);
    this.toggleFade = this.toggleFade.bind(this);
    this.state = {
      collapse: true,
      fadeIn: true,
      timeout: 300,
      productList: [
        {
          id: "0002",
          username: "Balanced",
          product:
            "http://d1hxhfsggnhjjy.cloudfront.net/assets/products/bits/fan/fan-c84bde7170cff45ccf896a2b8609bc10ea4c49e1ed27dec250ce706d33cdf0f0.png",
          location: "Karu",
          premium: false,
          phoneNo: "00000000",
          title: "Fan"
        }
      ],
      selectedProduct: null,
      showDeletePrompt: false,
      showPremiumPrompt: false
    };
  }

  toggleFade() {
    this.setState(prevState => {
      return { fadeIn: !prevState };
    });
  }

  deleteProduct() {
    const id = this.state.selectedProduct.id;
    if (!id) {
      this.toggleDeletePrompt();
      return;
    }
    callApi(`/deleteProduct/${id}`)
      .then(() => {
        this.props.dispatch(showInfo("Successfully Deleted"));
        this.toggleDeletePrompt();
        this.clearSelectedState();
      })
      .catch(() => {
        this.props.dispatch(showError("Error deleting, pls refresh the page"));
        this.toggleDeletePrompt();
        this.clearSelectedState();
      });
  }

  clearSelectedState() {
    this.setState({
      ...this.state,
      selectedProduct: null
    });
  }

  togglePremiumContents() {
    const product = this.state.selectedProduct;
    if (!product.id) {
      this.toggleDeletePrompt();
      return;
    }
    callApi(`/premiumProduct`, product, "POST")
      .then(() => {
        this.props.dispatch(showInfo("Successfully Changed"));
        this.togglePremiumPrompt();
      })
      .catch(() => {
        this.props.dispatch(showError("Error changing Premium status"));
        this.togglePremiumPrompt();
      });
  }

  togglePremiumPrompt(product) {
    this.setState(prev => ({
      ...this.state,
      selectedProduct: product || null,
      showPremiumPrompt: !prev.showPremiumPrompt
    }));
  }

  toggleDeletePrompt(product) {
    this.setState(prev => ({
      ...this.state,
      selectedProduct: product || null,
      showDeletePrompt: !prev.showDeletePrompt
    }));
  }

  render() {
    const deleteConfirmText = this.state.selectedProduct ? (
      <span>
        Delete Title: <strong> {this.state.selectedProduct.title} </strong> of{" "}
        <strong> Username: </strong> {this.state.selectedProduct.username}
      </span>
    ) : (
      ""
    );
    const premiumConfirmText = this.state.selectedProduct ? (
      <span>
        Change Title: <strong> {this.state.selectedProduct.title} </strong> to{" "}
        {this.state.selectedProduct.premium ? "Regular" : "Premium"}?{" "}
      </span>
    ) : (
      ""
    );
    return (
      <div className="animated fadeIn">
        <Row>
          {[0, 0, 0, 0, 0, 0, 0].map((product, i) => (
            <ProductList
              key={i}
              data={this.state.productList[0]}
              deleteProduct={prod => this.toggleDeletePrompt(prod)}
              togglePremiumPrompt={prod => this.togglePremiumPrompt(prod)}
            />
          ))}
        </Row>
        <Prompt
          show={this.state.showDeletePrompt}
          confirmButtonText="Delete"
          handleConfirmation={() => this.deleteProduct()}
          toggle={() => this.toggleDeletePrompt()}
          confirmText={deleteConfirmText}
          title="Delete"
        />
        <Prompt
          show={this.state.showPremiumPrompt}
          confirmButtonText="Change"
          handleConfirmation={() => this.togglePremiumContents()}
          toggle={() => this.togglePremiumPrompt()}
          confirmText={premiumConfirmText}
          title="Change Premium Content"
        />
      </div>
    );
  }
}

export default connect()(Cards);
