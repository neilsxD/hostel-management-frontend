import React, { Component } from "react";
import { API } from "../../config";
import axios from "axios";
import Session from "react-session-api";
import { Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from "react-router-dom";

class BulkUploadStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostels: [],
      distinctHostels: [],
      hostel_name: "",
    };
  }

  getHostelsDetails() {
    axios.get(`${API}/hostels`)
      .then(response => {
        // console.log(response);
        var unique = response.data.response
            .map(p => p.hostel_name)
            .filter((name, index, arr) => arr.indexOf(name) == index);
        this.setState({
          hostels: response.data.response,
          distinctHostels: unique
        });
      })
      .catch(error => console.log(error));
  }

  onChange = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({
      [nam]: val,
    });
  }

  componentDidMount() {
    this.getHostelsDetails();
  }

  render(props) {
    return (
      <div>
        <h1>Bulk Upload Students Details</h1>
        <div>
          <Form>
            <Row form>
              <Col md={5}>
                <FormGroup>
                  <Label for="hostelSelect">Select Hostel</Label>
                  <Input type="select" name="hostel_name" id="hostelSelect" onChange={this.onChange} >
                    <option hidden>Select Value</option>
                    {
                      this.state.distinctHostels.map((hostel, idx) => {
                        return (
                          <option key={idx}>{hostel}</option>
                        );
                      })
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={5}>
                <FormGroup>
                  <Label for="blockSelect">Select Block</Label>
                  <Input type="select" name="block_name" id="blockSelect" onChange={this.onChange}>
                    <option hidden>---</option>
                    {
                      this.state.hostels
                          .filter((hostel) => hostel.hostel_name===this.state.hostel_name)
                          .map((hostel, idx) => <option key={idx}>{hostel.block_name}</option>)
                    }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={2}>
                <Link to="/assets/sample.xlsx" onClick={e => e.preventDefault()}>
                  Download CSV Sample <i className="fa fa-download"></i>
                </Link>
              </Col>
              <Col md={5}>

              </Col>
              <Col md={5}>
                <Button type="submit" color="primary" className="m-auto">Save</Button>
              </Col>
            </Row>
          </Form>      
        </div>
      </div>
    );
  }
}
export default BulkUploadStudent;
