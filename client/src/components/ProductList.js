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
import moment from 'moment'

export default ({ data, }) => 
  <Col xs="12" sm="6" md="4">
    <Card className="card-accent-primary">
      <CardHeader>
        {data.username}
        <span className="pull-right" ><strong> Tel:</strong> {data.phoneNumber} </span>
      </CardHeader>
      <CardBody>
      <CardImg top width="100%" src={data.product} alt={data.title} />
      </CardBody>
      <CardFooter> 
        <div>
        <strong> Description: </strong> {data.description}
        </div>
      <div><strong> Date Posted: </strong> {moment(data.created).calendar()} </div>
      <div><strong> State: </strong> {data.state}
      <strong> LGA: </strong> {data.localGovtArea}
      </div>
      </CardFooter>
    </Card>
  </Col>;

