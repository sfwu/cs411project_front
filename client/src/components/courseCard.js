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


class CourseCardBody extends React.Component{

    constructor(props){
        super(props);

    }
    
    render () {
        return(
            <>
                {/* <CardBody>
                <Table dark>
                    <thead>
                        <tr>

                        <th>Course Number</th>
                        <th>Course Title</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>{this.props.courseInfo.Course}</td>
                        <td>{this.props.courseInfo.CourseTitle}</td>
                    
                        </tr>
                    </tbody>
                    </Table>
                </CardBody> */}

                        <td>{this.props.courseInfo.Course}</td>
                        <td>{this.props.courseInfo.CourseTitle}</td>
            </>
        )
    }
}
export default CourseCardBody;