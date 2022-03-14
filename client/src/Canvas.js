import React, { Component } from "react";
import P5Wrapper from "react-p5-wrapper";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import sketch from "./sketches/sketch";
import Output from "./Output";
import "./Canvas.css";
import UploadButton from "./UploadButton";

let savedImage = "";

class Canvas extends Component {
  constructor() {
    super();
    this.state = {
      color: false,
      evaluate: false,
      formatted_equation: "",
    };
  }

  pseudo = (data) => {
    savedImage = data;
  };

  sendImgToServer = (image) => {
    console.log("req:", image);
    let img = image.replace("data:image/png;base64,", "");

    let data = {};
    data.image = img;

    fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        let data1 = JSON.parse(data);
        console.log("Success:", data1);
        this.setState({
          color: false,
          evaluate: false,
          formatted_equation: data1["Formatted_equation"],
        });
        console.log(this.state);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  onClear = () => {
    this.setState({
      color: true,
      evaluate: false,
      formatted_equation: "",
    });
  };

  onEval = () => {
    this.setState({
      color: false,
      evaluate: true,
      formatted_equation: "",
    });
  };

  render() {
    return (
      <Container fluid>
        <Row>
          {/* Whiteboard */}
          <div className="whiteboard">
            <Col className="border border-dark" xl={12}>
              <P5Wrapper
                sketch={sketch}
                color={this.state.color}
                evaluate={this.state.evaluate}
                callBack={this.pseudo}
              ></P5Wrapper>
            </Col>
          </div>

          <div className="formatted-Equation col-md-8">
            <row>
              <Output formatted_equation={this.state.formatted_equation} />
            </row>
          </div>

          {/* Interface */}
          <Col xl={2}>
            <br />
            <button
              type="button"
              onClick={
                this.state.evaluate
                  ? () => this.sendImgToServer(savedImage)
                  : this.onEval
              }
              className="btn btn-success btn-block "
            >
              {this.state.evaluate ? "Predict" : "Save"}
            </button>
            <br />
            <button
              type="button"
              onClick={this.onClear}
              className="btn btn-dark btn-block "
            >
              Clear
            </button>
            <br />
            <div className="row">
              <div className="offset-md-3">
                <UploadButton sendImgToServer={this.sendImgToServer} />
              </div>
            </div>
            <br />
            <br />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Canvas;
