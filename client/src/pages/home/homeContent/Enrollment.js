import React, {useState} from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Container,
  Col,
  ButtonDropdown,
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
} from "reactstrap";

import EmploymentCardBody from '../../../components/enrollmentCard'
import { enrollmentAdd, enrollmentDelete, enrollmentUpdate, enrollmentGetAll } from '../../../components/userFunction'

class Enrollment extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      id: '',
      NetID: '',
      CourseTitle: '',
      Department: '',
      CourseNum: '',
      enrollmentlist: [],
      dropDownValue: 'Select Department',
      dropDownOpen: false,
      dropDownList:[
        {
          dropID:0,
          fullName: "Atmospheric Sciences",
          shorName: "ATMS"
        },
        {
          dropID:1,
          fullName: "Computer Sicence",
          shorName: "CS"
        },
        {
          dropID:2,
          fullName: "Electrical and Computer Engineering",
          shorName: "ECE"
        },
        {
          dropID:3,
          fullName: "Linguistics",
          shorName: "LING"
        },
        {
          dropID:4,
          fullName: "Mathematics",
          shorName: "MATH"
        },
        {
          dropID:5,
          fullName: "Physics",
          shorName: "PHYS"
        },
        {
          dropID:6,
          fullName: "Statistics",
          shorName: "STAT"
        },
      ]
    }
      this.onChange = this.onChange.bind(this)
      this.handleAdd = this.handleAdd.bind(this)
      this.handleGetAllEnrollments= this.handleGetAllEnrollments.bind(this)
      this.handleModify = this.handleModify.bind(this)
      this.getAllHistory = this.getAllHistory.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
      this.handleDropDown = this.handleDropDown.bind(this)
      this.hendleDropDownChangeValue = this.hendleDropDownChangeValue.bind(this)
  }



handleDropDown(e) {

    this.setState({
        dropDownOpen: !this.state.dropDownOpen
    });
}

hendleDropDownChangeValue(e) {
  this.setState({dropDownValue: e.target.textContent})
}


  // display all the history
  // note that the history need to be fetch by handleGetAllEnrollments
  getAllHistory = (enrollmentlist) => {
    return enrollmentlist.map(({id, value}) => {
        return (
          <Card >
            <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="5">
                            <h3 className="mb-0">Enrollments {id}</h3>
                        </Col>
                        
                        <Col className="text-right" xs="5">
                            <Button
                                color="primary"
                                href="#pablo"
                                id = {id}
                                onClick = {this.handleModify}
                                size="sm"
                            >
                                Modify
                            </Button>
                    </Col>
                    </Row>
                    </CardHeader>
          <EmploymentCardBody
            enrollmentInfo = {value}
          />
          </Card>
        )
    })
  }


  handleModify(e){
    e.preventDefault()
    
    this.setState({ 
      CourseTitle: this.state.enrollmentlist[e.target.id].value.CourseTitle,
      Department: this.state.enrollmentlist[e.target.id].value.Department,
      CourseNum: this.state.enrollmentlist[e.target.id].value.CourseNum,
      dropDownValue: this.state.enrollmentlist[e.target.id].value.Department,
      id: e.target.id
     })
  }




  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

async handleAdd(e){
    e.preventDefault()

    const userEnrollment = {

      NetID: this.props.NetID,
      CourseTitle: this.state.CourseTitle,
      Department: this.state.dropDownValue,
      CourseNum: this.state.CourseNum,
    }

    const resoponse = await enrollmentAdd(userEnrollment);
    this.setState({ enrollmentlist: [...this.state.enrollmentlist, {id: this.state.enrollmentlist.length, value: userEnrollment }] }) 
    console.log(resoponse.message)
}


async handleDelete(e){
  e.preventDefault()

  const userEnrollment = {

    NetID: this.props.NetID,
    Department: this.state.dropDownValue,
    CourseNum: this.state.CourseNum,
  }

  const resoponse = await enrollmentDelete(userEnrollment);
  if( resoponse.status   == 204){
    var enrollmentlist_copy = [...this.state.enrollmentlist];
    enrollmentlist_copy.splice(this.state.id, 1);
    this.setState({ enrollmentlist: enrollmentlist_copy})
  }
 
  console.log(resoponse.message)
}


async handleUpdate(e){
  e.preventDefault()

  const userEnrollment = {

    NetID: this.props.NetID,
    CourseTitle: this.state.CourseTitle,
    Department: this.state.dropDownValue,
    CourseNum: this.state.CourseNum,
  }

  const userEnrollment_state = {
    CourseTitle: this.state.CourseTitle,
    Department: this.state.dropDownValue,
    CourseNum: this.state.CourseNum,
  }

  const resoponse = await enrollmentUpdate(userEnrollment);
  
  if( resoponse.status == 204){
    var enrollmentlist_copy = [...this.state.enrollmentlist];
    enrollmentlist_copy[this.state.id].value = userEnrollment_state;
    this.setState({ enrollmentlist: enrollmentlist_copy})
  }
  console.log(resoponse.message)
}



async handleGetAllEnrollments(e){
  e.preventDefault()

  const user = {
    NetID: this.props.NetID
  }

  const enrollmentlist = await enrollmentGetAll(user);

  if(enrollmentlist.status == 200){
    console.log(enrollmentlist.employment)
    this.setState({ enrollmentlist: enrollmentlist.enrollment })
  }
}


  render() {
    return (
        <>
         
           
        <Container >
        <Row>
        <Col className="order-xl-1" xl="10">
          <Card className="bg-secondary shadow">
          
          <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">My Employment history, NetID: {this.props.NetID}</h3>
                    </Col>
                    
                    <Col className="text-right" xs="5">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleGetAllEnrollments}
                        size="sm"
                      >
                        Show History
                      </Button>
                    </Col>
                  </Row>
        </CardHeader>

        
        <CardBody>
          <Form>
            
          <Row className="align-items-center">
          <Col xs="5">
          <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-NetID_add"
              >
                Course Title
              </label>
              <Input
                className="form-control-alternative"
                // id="input-username"
                type="text"
                name = 'CourseTitle'
                value={this.state.CourseTitle}
                onChange={this.onChange}
              />
            
            </FormGroup>
            </Col>
             
             
          </Row>

          <Row>
            <Col xs="5">
            
              {/* <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Department
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'Department'
                  value={this.state.Department}
                  onChange={this.onChange}
                />
              
              </FormGroup> */}
              <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  CourseNum (Required)
                </label>
                <br />
              <ButtonDropdown isOpen={this.state.dropDownOpen} toggle={this.handleDropDown}>
                  <DropdownToggle caret>
                      {this.state.dropDownValue}
                  </DropdownToggle>
                  <DropdownMenu>
                      {this.state.dropDownList.map(department => {
                          return (
                              <DropdownItem id={department.dropID} key={department.dropID} onClick={this.hendleDropDownChangeValue}>
                                {department.shorName}
                              </DropdownItem>
                          )
                      })}
                  </DropdownMenu>

              </ButtonDropdown>
              </Col>
              <Col xs="5">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  CourseNum (Required)
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'CourseNum'
                  value={this.state.CourseNum}
                  onChange={this.onChange}
                />
              </FormGroup>
             
                </Col>
          </Row>

         

        

          <Row>

          <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleAdd}
                        size="sm"
                      >
                        Add
                      </Button>
                    </Col>

                    <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleDelete}
                        size="sm"
                      >
                        Delete
                      </Button>
                    </Col>

                    <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleUpdate}
                        size="sm"
                      >
                        Update
                      </Button>
                    </Col>
          </Row>



          </Form>
          </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>
        
        



        <Container >
          <Row className="align-items-center">
            {this.getAllHistory(this.state.enrollmentlist)}
          </Row>
        </Container>
      </>
    );
  }
}

export default Enrollment;
