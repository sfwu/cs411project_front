
import React from "react";

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
  Col
} from "reactstrap";

import EmploymentCard from '../../../components/employmentCard'

class Employment extends React.Component {

  constructor() {
    super();
    this.state = 
    {
      search: '',
      NetID: '',
      Position: '',
      StartDate: '',
      EndDate: '',
      OfficeId: '',
    }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
      this.handleInsertSubmit = this.handleInsertSubmit.bind(this);
      this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
      this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  onSubmit(e){
    e.preventDefault()

    const user = {
      NetID: this.state.NetID,
      Position: this.state.Position,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      OfficeId: this.state.OfficeId,
  }

  //   profileUpdate(user).then(res =>{
  //     this.props.history.push('/Employment')
  // })
  }


handleSearchSubmit(e) {
    console.log("making request")
    console.log(this.state.NetID)
    fetch("/api/find_em", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify({StudentId: this.state.search})
      })
      .then(response => {
        console.log(response)
          return response.json()})
      .then(json => {
        // this.setState({playerName: json[0], })
        console.log(json)
      })
  }

  handleInsertSubmit(e) {
    console.log("making request")
    fetch("/api/insert_em", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify({Position: this.state.Position, StartDate: this.state.StartDate, EndDate: this.state.EndDate,  StudentId: this.state.NetID, OfficeId: this.state.OfficeId})
      })
    console.log("Insert success")

  }

  handleDeleteSubmit(e) {
    console.log("making request")
    fetch("/api/delete_em", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify({Position: this.state.Position, StartDate: this.state.StartDate, EndDate: this.state.EndDate,  StudentId: this.state.NetID, OfficeId: this.state.OfficeId})
      })
      console.log("Delete success")
  }

  handleUpdateSubmit(e) {
    console.log("making request")
    fetch("/api/update_em", {
      method:"POST",
      cache: "no-cache",
      headers:{
          "content_type":"application/json",
      },
      body:JSON.stringify({Position: this.state.Position, StartDate: this.state.StartDate, EndDate: this.state.EndDate,  StudentId: this.state.NetID, OfficeId: this.state.OfficeId})
      })
      console.log("Update success")
  }


  render() {
    return (
        <>
         
        <Container >
        
        <label
          className="form-control-label"
          htmlFor="input-search_netid"
        >
          Search_NetID
        </label>
        <Row>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            
        <Input
          className="form-control-alternative"
          placeholder=""
          type="text"
          name ='search'
          value={this.state.search}
          onChange={this.onChange}
        />
        </Col>
        <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
        <Button
          color="primary"
          href="#pablo"
          onClick={this.handleSearchSubmit}
          size="sm"
        >
          Check out!
        </Button>
        </Col>
        </Row>
        </Container>

        <Container >
          <Card>
          
          <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="2">
                      <h3 className="mb-0">Add Employment history</h3>
                    </Col>
                    <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleInsertSubmit}
                        size="sm"
                      >
                        Add
                      </Button>
                    </Col>

                    <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleDeleteSubmit}
                        size="sm"
                      >
                        Delete
                      </Button>
                    </Col>

                    <Col className="text-right" xs="3">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleUpdateSubmit}
                        size="sm"
                      >
                        Update
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

        
        <CardBody>
          <Form>
            
          <Row>
              <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-NetID_add"
              >
                NetID
              </label>
              <Input
                className="form-control-alternative"
                // id="input-username"
                type="text"
                name = 'netid'
                value={this.state.netid}
                onChange={this.onChange}
              />
            
            </FormGroup>
          </Row>

          <Row>
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Position
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'Position'
                  value={this.state.Position}
                  onChange={this.onChange}
                />
              
              </FormGroup>
          </Row>


          <Row>
              <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    StartDate
                  </label>
                  <Input
                    className="form-control-alternative"
                    // id="input-username"
                    type="text"
                    name = 'StartDate'
                    value={this.state.StartDate}
                    onChange={this.onChange}
                  />
                
                </FormGroup>
          </Row>


          <Row>
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  EndDate
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'EndDate'
                  value={this.state.EndDate}
                  onChange={this.onChange}
                />
              </FormGroup>
          </Row>


          <Row>

          <FormGroup>
            <label
              className="form-control-label"
              htmlFor="input-username"
            >
              OfficeId
            </label>
            <Input
              className="form-control-alternative"
              // id="input-username"
              type="text"
              name = 'OfficeId'
              value={this.state.OfficeId}
              onChange={this.onChange}
            />
          
          </FormGroup>
          </Row>

          </Form>
          </CardBody>
          </Card>
        </Container>
        




        <Container >
          <Row className="align-items-center">
            <EmploymentCard 
              num = '01'
              NetID = '125'
              Position = 'General Manager'
              StartDate = '2017-01-01'
              ndDate = '2018-01-01'
              OfficeId ='01'
            />
          </Row>

          <Row className="align-items-center">
            <EmploymentCard 
              num = '01'
              NetID = '125'
              Position = 'General Manager'
              StartDate = '2017-01-01'
              ndDate = '2018-01-01'
              OfficeId ='01'
            />
          </Row>

          <Row className="align-items-center">
            <EmploymentCard 
              num = '01'
              NetID = '125'
              Position = 'General Manager'
              StartDate = '2017-01-01'
              ndDate = '2018-01-01'
              OfficeId ='01'
            />
          </Row>

          <Row className="align-items-center">
            <EmploymentCard 
              num = '01'
              NetID = '125'
              Position = 'General Manager'
              StartDate = '2017-01-01'
              ndDate = '2018-01-01'
              OfficeId ='01'
            />
          </Row>
        </Container>
      </>
    );
  }
}

export default Employment;
