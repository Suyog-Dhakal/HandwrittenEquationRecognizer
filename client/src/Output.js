import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Output(props) {
  return (
    <div className="offset-md-1">
      <Form>
        <Form.Group as={Row} controlId="output1">
          <Form.Label column sm="3">
            Recognized Expression:-
          </Form.Label>
          <Col sm="5">
            <Form.Control readOnly placeholder={props.formatted_equation} />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Output;
