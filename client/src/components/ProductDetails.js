import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import states from "../utils/States";
import { AppSwitch } from "@coreui/react";

export default ({
  data,
  handleInputChange,
  submit,
  handleNumberInputChange,
  handleSwitchChange
}) => (
  <Form>
    <FormGroup>
      <Label for="exampleEmail">Product Title</Label>
      <Input
        type="text"
        name="title"
        id="exampleEmail"
        placeholder="Product Title"
        value={data.title}
        onChange={e => handleInputChange(e)}
      />
    </FormGroup>
    <Row>
      <Col>
        <FormGroup>
          <Row>
            <Col md={4}>
              <Label for="exampleText">Price</Label>
            </Col>
            <Col md={8}>
              <Input
                type="text"
                name="description"
                id="exampleText"
                value={data.price}
                onChange={e => handleNumberInputChange(e)}
              />
            </Col>
          </Row>
        </FormGroup>
      </Col>
      <Col>
        <FormGroup>
          <Input
            type="checkbox"
            name="negotiable"
            id="exampleText"
            checked={data.negotiable}
            onChange={e => handleSwitchChange('negotiable')}
          />
          <Label for="exampleText">Negotiable</Label>
        </FormGroup>
        <FormGroup>
          <Input
            type="checkbox"
            name="negotiable"
            id="exampleText"
            checked={!data.negotiable}
            onChange={e => handleSwitchChange('non-negotiable')}
          />
          <Label for="exampleText">Non-Negotiable</Label>
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Col xs="6">
        <FormGroup>
          <Label for="exampleText">State</Label>
          <Input
            type="select"
            name="state"
            id="exampleText"
            value={data.state}
            onChange={e => handleInputChange(e)}
          >
            <option value="" selected disabled>
              {" "}
              Select One{" "}
            </option>
            {states.map(state => (
              <option value={state.state.name} key={state.state.id}>
                {" "}
                {state.state.name}{" "}
              </option>
            ))}
          </Input>
        </FormGroup>
      </Col>
      <Col xs="6">
        <FormGroup>
          <Label for="exampleText">Local Govt.</Label>
          <Input
            type="select"
            name="localGovtArea"
            id="exampleText"
            value={data.localGovtArea}
            onChange={e => handleInputChange(e)}
          >
            <option value="" selected disabled>
              {" "}
              Select One{" "}
            </option>
            {states.map(
              state =>
                data.state
                  ? states
                      .filter(state => state.state.name === data.state)[0]
                      .state.locals.map(local => (
                        <option value={local.name} key={local.id}>
                          {" "}
                          {local.name}{" "}
                        </option>
                      ))
                  : ""
            )}
          </Input>
        </FormGroup>
      </Col>
    </Row>
    <Button onClick={() => submit()} className={"pull-right"}>
      Submit
    </Button>
  </Form>
);
