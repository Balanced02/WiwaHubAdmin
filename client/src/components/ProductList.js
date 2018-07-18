import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardImg
} from "reactstrap";
import moment from 'moment'

export default ({ data, }) => 
  <Col xs="12" sm="6" md="4">
    <Card className="card-accent-primary">
      <CardHeader>
        {data.username}
        <div className="float-right" ><strong> Tel:</strong> {data.phoneNumber} </div>
      </CardHeader>
      <CardBody>
      <CardImg top height="180px" src={data.product} alt={data.title} />
      </CardBody>
      <CardFooter> 
        <div>
        <strong> Title: </strong> {data.title}
        </div>
        <div>
        <strong> Price: </strong> {data.price} { data.negotiable ? "(Negotiable)" : "(Fixed)" }
        </div>
      <div><strong> Date Posted: </strong> {moment(data.created).calendar()} </div>
      <div><strong> State: </strong> {data.state}
      <strong> LGA: </strong> {data.localGovtArea}
      </div>
      </CardFooter>
    </Card>
  </Col>;

