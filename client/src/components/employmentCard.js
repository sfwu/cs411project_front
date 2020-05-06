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
                    {/* <CardBody>
                    <Table dark size="50">
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
                    </CardBody> */}


                            <td>{this.props.employmentInfo.Position}</td>
                            <td>{this.props.employmentInfo.StartDate}</td>
                            <td>{this.props.employmentInfo.EndDate}</td>
                            <td>{this.props.employmentInfo.CompanyName}</td>
                            <td>{this.props.employmentInfo.Industry}</td>
                            <td> {this.props.employmentInfo.CompanyCity}</td>
                            <td> {this.props.employmentInfo.CompanyState}</td>
                            <td> {this.props.employmentInfo.CompanyCountry}</td>
                            <td> {this.props.employmentInfo.CompanyAddress}</td>
                        

            </>
        )
    }
}
export default EmploymentCardBody;