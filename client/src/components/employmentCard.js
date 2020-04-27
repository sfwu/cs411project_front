import React, {useEffect, useState} from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Table,
  Row,
  Col
} from "reactstrap";


class EmploymentCardBody extends React.Component{

    constructor(props){
        super(props);

    }
    
    render () {
        return(
            <>
                {/* <Card> */}
                {/* <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="5">
                            <h3 className="mb-0">Employment History {this.props.id}</h3>
                        </Col>

                        <Col className="text-right" xs="5">
                            <Button
                                color="primary"
                                href="#pablo"
                                value={this.props.id}
                                onClick={this.props.handleModify(this.props.id)}
                                size="sm"
                            >
                                Modify
                            </Button>
                    </Col>
                    </Row>
                    </CardHeader> */}
                    <CardBody>
                    <Table dark>
                        <thead>
                            <tr>
                            <th>Position</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>Companey Name</th>
                            <th>Industry</th>
                            <th> City</th>
                            <th> State</th>
                            <th> Country</th>
                            <th> Address</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{this.props.employmentInfo.Position}</td>
                            <td>{this.props.employmentInfo.StartDate}</td>
                            <td>{this.props.employmentInfo.EndDate}</td>
                            <td>{this.props.employmentInfo.CompanyName}</td>
                            <td>{this.props.employmentInfo.Industry}</td>
                            <td> {this.props.employmentInfo.CompanyCity}</td>
                            <td> {this.props.employmentInfo.CompanyState}</td>
                            <td> {this.props.employmentInfo.CompanyCountry}</td>
                            <td> {this.props.employmentInfo.CompanyAddress}</td>
                        
                            </tr>
                        </tbody>
                        </Table>
                    </CardBody>
                {/* </Card> */}
            </>
        )
    }
}
export default EmploymentCardBody;