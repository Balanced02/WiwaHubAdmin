import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardImg
} from "reactstrap";
import { AppSwitch } from "@coreui/react";

export default ({ data, deleteProduct, togglePremiumPrompt }) => 
  <Col xs="12" sm="6" md="4">
    <Card className="card-accent-primary">
      <CardHeader>
        {data.username}
        <AppSwitch
          className={"float-right mb-0"}
          label
          color={"info"}
          defaultChecked={data.premium}
          size={"sm"}
          onChange={() => togglePremiumPrompt(data)}
        />
      </CardHeader>
      <CardBody>
      <CardImg top width="100%" src={data.product} alt={data.title} />
      </CardBody>
      <CardFooter> <strong> Contact: </strong> {data.phoneNo} <span className={'float-right fa fa-trash fa-1.5x'} style={{ color: 'red', cursor: 'pointer' }} onClick={() => deleteProduct(data)} ></span> </CardFooter>
    </Card>
  </Col>;

