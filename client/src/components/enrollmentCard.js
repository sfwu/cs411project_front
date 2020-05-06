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


class EnrollmentCardBody extends React.Component{

    constructor(props){
        super(props);

    }
    
    render () {
        return(
            <>
                    {/* <CardBody >
                    <Table dark>
                        <thead>
                            <tr>
                            <th>Course Title</th>
                            <th>Department</th>
                            <th>Course Number</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{this.props.enrollmentInfo.CourseTitle}</td>
                            <td>{this.props.enrollmentInfo.Department}</td>
                            <td>{this.props.enrollmentInfo.CourseNum}</td>
                        
                            </tr>
                        </tbody>
                        </Table>
                    </CardBody> */}

                    <td>{this.props.enrollmentInfo.CourseTitle}</td>
                    <td>{this.props.enrollmentInfo.Department}</td>
                    <td>{this.props.enrollmentInfo.CourseNum}</td>


            </>
        )
    }
}
export default EnrollmentCardBody;