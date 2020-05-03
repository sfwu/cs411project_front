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


class JobCardBody extends React.Component{

    constructor(props){
        super(props);

    }
    
    render () {
        return(
            <>
                <CardBody>
                <Table dark>
                    <thead>
                        <tr>
                        <th>Position</th>
                        <th>Companey Name</th>
                        <th>Companey City</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{this.props.jobInfo.Position}</td>
                        <td>{this.props.jobInfo.CompanyName}</td>
                        <td>{this.props.jobInfo.CompanyCity}</td>
                    
                        </tr>
                    </tbody>
                    </Table>
                </CardBody>
            </>
        )
    }
}
export default JobCardBody;