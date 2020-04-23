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


class employmentCard extends React.Component{

    constructor(props){
        super(props);

    }
    
    render () {
        return(
                <Card>
                <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="5">
                            <h3 className="mb-0">Employment History {this.props.num}</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Table>
                        <thead>
                            <tr>
                            <th> NetID</th>
                            <th>Position</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            <th>OfficeId</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{this.props.NetID}</td>
                            <td>{this.props.Position}</td>
                            <td>{this.props.StartDate}</td>
                            <td>{this.props.ndDate}</td>
                            <td>{this.props.OfficeId}</td>
                            </tr>
                        </tbody>
                        </Table>
                    </CardBody>
                </Card>

        )
    }
}
export default employmentCard;