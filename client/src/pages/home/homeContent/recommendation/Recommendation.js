import React from "react";
import "./Recommendation.css"
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
  CardTitle, 
  CardSubtitle,
  CardText,
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  ButtonDropdown,
  Table,
} from "reactstrap";

import {getJobs, getCourse_Ind, getCourse_Pos, getCourse} from "../../../../components/userFunction"
import JobCardBody from '../../../../components/jobCard'
import CourseCardBody from '../../../../components/courseCard'

class Recommendation extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      NetID: '',
      numCluster: '',
      numCourse: '',
      indicator: '',
      jobList: [],
      courseList: [],
      dropDownValue0: 'Select Industry',
      dropDownOpen0: false,
      dropDownList0:[
        {
          dropID:0,
          name: 'Select Industry'
        },
        {
          dropID:1,
          name: "Research",
        },
        {
          dropID:2,
          name: "Analytics Consulting",
        },
        {
          dropID:3,
          name: "Government",
        },
        {
          dropID:4,
          name: "Insurance",
        },
        {
          dropID:5,
          name: "Management Consulting",
        },
        {
          dropID:6,
          name: "Education",
        },
      ],
      dropDownValue1: 'Select Position',
      dropDownOpen1: false,
      dropDownList1:[
        {
          dropID:0,
          name: 'Select Position'
        },
        {
          dropID:1,
          name: "Research Intern",
        },
        {
          dropID:2,
          name: "Sales Associate",
        },
        {
          dropID:3,
          name: "Software Developer Intern",
        },
        {
          dropID:4,
          name: "Software Engineer Intern",
        }
      ]
    }
      this.onChange = this.onChange.bind(this)
      this.handleJobRecommend = this.handleJobRecommend.bind(this)
      this.getAllJobs = this.getAllJobs.bind(this)
      this.getAllCourses = this.getAllCourses.bind(this)
      this.handleDropDown0 = this.handleDropDown0.bind(this)
      this.handleDropDown1 = this.handleDropDown1.bind(this)
      this.hendleDropDownChangeValue0 = this.hendleDropDownChangeValue0.bind(this)
      this.hendleDropDownChangeValue1 = this.hendleDropDownChangeValue1.bind(this)
      // this.handleCourseRecommend_Ind = this.handleCourseRecommend_Ind.bind(this)
      // this.handleCourseRecommend_Pos = this.handleCourseRecommend_Pos.bind(this)
      this.handleCourseRecommend = this.handleCourseRecommend.bind(this)

  }






  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  handleDropDown0(e) {

    this.setState({
        dropDownOpen0: !this.state.dropDownOpen0
    });
}

handleDropDown1(e) {

  this.setState({
      dropDownOpen1: !this.state.dropDownOpen1
  });
}


  hendleDropDownChangeValue0(e) {
    this.setState({dropDownValue0: e.target.textContent})
  }

  hendleDropDownChangeValue1(e) {
    this.setState({dropDownValue1: e.target.textContent})
  }

  async handleJobRecommend(e){
    e.preventDefault()
  
    const user = {
      NetID: this.props.NetID,
      numCluster: this.state.numCluster,
    }
  
    const jobList = await getJobs(user);
    // console.log(jobList)
    this.setState({ jobList: jobList.jobs })
  }

  getAllJobs= (jobList) => {
    return jobList.map(({id, value}) => {
        return (
          <tr> 
          <JobCardBody jobInfo = {value} />
          </tr>
        )
    })
  }


  async handleCourseRecommend(e){
    e.preventDefault()
  
    const user = {
      NetID: this.props.NetID,
      Industry: this.state.dropDownValue0,
      Position: this.state.dropDownValue1,
      numCourse: this.state.numCourse,
    }
  
    const courseList = await getCourse(user);
    this.setState({ courseList: courseList.courses })
  }


  getAllCourses= (courseList) => {
    return courseList.map(({id, value}) => {
        return (
          <tr>
          <CourseCardBody
            courseInfo = {value}
          />
          </tr>
        )
    })
  }


  



  
  render() {
    return (
     <>
     {/* first do jobs */}
     <Container className='mainContent1'>
        <Row>
        <Col className="order-xl-1" xl="10">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
          
          <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">Job Recommendation, NetID: {this.props.NetID}</h3>
                    </Col>
                  </Row>
                  </CardHeader>
                  <CardBody>
                    <CardTitle>
                      Hello there! Are you looking for jobs? Fill you profile and add any Employment and Enrollment historeis. 
                      We can recommend some jobs to you based on your records!
                      </CardTitle>


                      <CardTitle>
                        To get jobs recommended, first enter an integer as number of clusters, 
                        then click on "Show Me the Jobs!" below to see what you get.
                      </CardTitle>

                      <Row > 
                      <Col xs='5'>  
                        <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Train Factor (Required)
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-username"
                              type="text"
                              name = 'numCluster'
                              value={this.state.numCluster}
                              onChange={this.onChange}
                            />
                          
                          </FormGroup>
                        </Col>
                       </Row>

                       <Row>
                      <Col>
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={this.handleJobRecommend}
                          size="sm"
                        >
                          Show Me the Jobs!
                        </Button>
                      </Col>
                      </Row>
                </CardBody>
          
          </Card>
          </Col>
          </Row>
        </Container>

        <br />
        <br />

        <Container className='showContent1'>
        <Row>
        <Col className="order-xl-1" xl="10">
        <Card  style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
            <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="5">
                            <h3 className="mb-0">Recommended Job</h3>
                        </Col>
                    </Row>
              </CardHeader>
          
              <CardBody>
                <div className='jobTable'> 
                <Table >
                    <thead>
                        <tr>
                        <th>Position</th>
                        <th>Companey Name</th>
                        <th>Companey City</th>

                        </tr>
                    </thead>
                    <tbody>
                    {this.getAllJobs(this.state.jobList)}
                    </tbody>
                    </Table>
                    </div>
                </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>

      <br />
      <br />
      <br />
      <br />
      <br />


     <Container className='mainContent1'>
     <Row>
        <Col className="order-xl-1" xl="10">
          <Card  style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
          
          <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">Course Recommendation</h3>
                    </Col>
                  </Row>
          </CardHeader>
                  <CardBody>
                    <CardTitle>
                      Did not see the jobs you are looking for? 
                      Don't worry, we are also able to recommend you some courses by  the choice of either industries or jobs!
                      </CardTitle>

      

                      <CardTitle>
                        To get courses recommended, select a industry OR a position that you are the most interested in.
                        Then click on the corresponding button! Note: if you make selection to both industry and position,
                        we will recommend courses based on industry as default!
                      </CardTitle>

                      <Row>
                      <Col xs="5">

                        <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Industry
                          </label>
                          <br />
                        <ButtonDropdown isOpen={this.state.dropDownOpen0} toggle={this.handleDropDown0}>
                            <DropdownToggle caret>
                                {this.state.dropDownValue0}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.dropDownList0.map(industry => {
                                    return (
                                        <DropdownItem id={industry.dropID} key={industry.dropID} onClick={this.hendleDropDownChangeValue0}>
                                          {industry.name}
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>

                        </ButtonDropdown>
                        </Col>

                        <Col xs="5">

                        <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Position
                          </label>
                          <br />
                        <ButtonDropdown isOpen={this.state.dropDownOpen1} toggle={this.handleDropDown1}>
                            <DropdownToggle caret>
                                {this.state.dropDownValue1}
                            </DropdownToggle>
                            <DropdownMenu>
                                {this.state.dropDownList1.map(position => {
                                    return (
                                        <DropdownItem id={position.dropID} key={position.dropID} onClick={this.hendleDropDownChangeValue1}>
                                          {position.name}
                                        </DropdownItem>
                                    )
                                })}
                            </DropdownMenu>

                        </ButtonDropdown>
                        </Col>
                        </Row>
                          
                          <br />

                        <Row>
                        <Col xs="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Number of Course (Required)
                          </label>
                          <Input
                            className="form-control-alternative"
                            // id="input-username"
                            type="text"
                            name = 'numCourse'
                            value={this.state.numCourse}
                            onChange={this.onChange}
                          />
                        </FormGroup>
                      
                          </Col>
                    </Row>


                    <Row>
                      <Col>
                        <Button
                          color="primary"
                          href="#pablo"
                          onClick={this.handleCourseRecommend}
                          size="sm"
                        >
                          Show Me Some Courses!
                        </Button>
                      </Col>
                      </Row>
                      

                      <br />
                      <br />


                </CardBody>

          </Card>
          </Col>
          </Row>
     </Container>

     <br />        
     <br />                  

     <Container className='showContent2'>
     <Row>
      <Col className="order-xl-1" xl="10">                          
     <Card  style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
            <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="10">
                            <h3 className="mb-0">Recommended Course</h3>
                        </Col>

            </Row>
            </CardHeader>
          <CardBody>
                <div className='courseTable'> 
                <Table >
                    <thead>
                        <tr>

                        <th>Course Number</th>
                        <th>Course Title</th>

                        </tr>
                    </thead>
                    <tbody>
                    {this.getAllCourses(this.state.courseList)}
                    </tbody>
                    </Table>
                  </div>
                </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>
     </>
    );
  }
}

export default Recommendation;



