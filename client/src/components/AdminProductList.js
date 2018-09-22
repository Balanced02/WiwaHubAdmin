import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  CardImg
} from "reactstrap";
import moment from "moment";
import AdsByGoogle from "./AdsByGoogle";

export default ({
  data,
  toggleDeletePrompt,
  togglePremiumPrompt,
  key,
  type
}) => (
  <Col xs="12" sm="6" md="4">
    <Card className="card-accent-primary">
      <CardHeader>
        {data.title}
        {type !== "myAds" ? (
          <span className="float-right">
            Premium{" "}
            <input
              type="checkbox"
              checked={data.premium}
              onChange={() => togglePremiumPrompt(data)}
            />{" "}
          </span>
        ) : null}
      </CardHeader>
      <CardBody>
        <CardImg top height="180px" src={data.product} alt={data.title} />
      </CardBody>
      <CardFooter>
        <div>
          <strong> Username: </strong> {data.username}
        </div>
        <div>
          <strong> Price: </strong> {data.price}{" "}
          {data.negotiable ? "(Negotiable)" : "(Fixed)"}
        </div>
        <div>
          <strong> Date Posted: </strong> {moment(data.created).calendar()}{" "}
        </div>
        <div>
          <strong> State: </strong> {data.state}
          <div>
            <strong> LGA: </strong> {data.localGovtArea}
          </div>{" "}
          <span className="float-right">
            {" "}
            <i
              className="fa fa-trash fa-1.4x"
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => toggleDeletePrompt(data)}
            />{" "}
          </span>
        </div>
      </CardFooter>
    </Card>
    {key % 10 === 0 ? <AdsByGoogle /> : ""}
  </Col>
);
