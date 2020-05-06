import React from "react";
import './Employment.css';
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
  Table,
  Col
} from "reactstrap";

import EmploymentCardBody from '../../../../components/employmentCard'
import { employmentAdd, employmentGetAll, employmentDelete, employmentUpdate } from '../../../../components/userFunction'

class Employment extends React.Component {

  constructor(props) {
    super(props);
    this.state = 
    {
      id: '',
      employmentID: '',
      NetID: '',
      Position: '',
      StartDate: '',
      EndDate: '',
      CompanyName: '',
      CompanyCity: '',
      CompanyState: '',
      CompanyCountry: '',
      CompanyAddress: '',
      Industry: '',
      employmentlist: []
    }
      this.onChange = this.onChange.bind(this)
      this.handleAdd = this.handleAdd.bind(this)
      this.handleGetAllHistory = this.handleGetAllHistory.bind(this)
      this.handleModify = this.handleModify.bind(this)
      this.getAllHistory = this.getAllHistory.bind(this)
      this.handleDelete = this.handleDelete.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
  }


  // display all the history
  // note that the history need to be fetch by handleGetAllHistory
  // getAllHistory = (employmentlist) => {
  //   return employmentlist.map(({id, value}) => {
  //       return (
  //         <Card >
  //           <CardHeader className="bg-white border-0">
  //                   <Row className="align-items-center">
  //                       <Col xs="5">
  //                           <h3 className="mb-0">Employment History {id}</h3>
  //                       </Col>
                        
  //                       <Col className="text-right" xs="5">
  //                           <Button
  //                               color="primary"
  //                               href="#pablo"
  //                               id = {id}
  //                               // onClick={this.handleModify(id)}
  //                               onClick = {this.handleModify}
  //                               size="sm"
  //                           >
  //                               Modify
  //                           </Button>
  //                   </Col>
  //                   </Row>
  //                   </CardHeader>
  //         <EmploymentCardBody
  //           employmentInfo = {value}
  //         />
  //         </Card>
  //       )
  //   })
  // }

  getAllHistory = (employmentlist) => {
    return employmentlist.map(({id, value}) => {
        return (
          <tr>
            <EmploymentCardBody
              employmentInfo = {value}
            />
            <td> 

                <Button
                color="primary"
                href="#pablo"
                id = {id}
                // onClick={this.handleModify(id)}
                onClick = {this.handleModify}
                size="sm"
            >
                Modify
            </Button>
            </td>
          </tr>
        )
    })
  }


  handleModify(e){
    e.preventDefault()
    
    this.setState({ 
      Position: this.state.employmentlist[e.target.id].value.Position,
      StartDate: this.state.employmentlist[e.target.id].value.StartDate,
      EndDate: this.state.employmentlist[e.target.id].value.EndDate,
      CompanyName: this.state.employmentlist[e.target.id].value.CompanyName,
      CompanyCity: this.state.employmentlist[e.target.id].value.CompanyCity,
      CompanyState: this.state.employmentlist[e.target.id].value.CompanyState,
      CompanyCountry: this.state.employmentlist[e.target.id].value.CompanyCountry,
      CompanyAddress: this.state.employmentlist[e.target.id].value.CompanyAddress,
      Industry: this.state.employmentlist[e.target.id].value.Industry,
      id: e.target.id
     })
  }




  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  async handleAdd(e){
    e.preventDefault()

    const userEmployment = {

      NetID: this.props.NetID,
      Position: this.state.Position,
      StartDate: this.state.StartDate,
      EndDate: this.state.EndDate,
      CompanyName: this.state.CompanyName,
      CompanyCity: this.state.CompanyCity,
      CompanyState: this.state.CompanyState,
      CompanyCountry: this.state.CompanyCountry,
      CompanyAddress: this.state.CompanyAddress,
      Industry: this.state.Industry,
    }

    const resoponse = await employmentAdd(userEmployment);
    this.setState({ employmentlist: [...this.state.employmentlist, {id: this.state.employmentlist.length, value: userEmployment }] }) 
    console.log(resoponse.message)
}


async handleDelete(e){
  e.preventDefault()

  const userEmployment = {

    NetID: this.props.NetID,
    Position: this.state.Position,
    CompanyName: this.state.CompanyName,
    CompanyCity: this.state.CompanyCity,
  }

  const resoponse = await employmentDelete(userEmployment);
  if( resoponse.status   == 204){
    var employmentlist_copy = [...this.state.employmentlist];
    employmentlist_copy.splice(this.state.id, 1);
    this.setState({ employmentlist: employmentlist_copy})
  }
 
  console.log(resoponse.message)
}


async handleUpdate(e){
  e.preventDefault()

  const userEmployment = {

    NetID: this.props.NetID,
    Position: this.state.Position,
    StartDate: this.state.StartDate,
    EndDate: this.state.EndDate,
    CompanyName: this.state.CompanyName,
    CompanyCity: this.state.CompanyCity,
    CompanyState: this.state.CompanyState,
    CompanyCountry: this.state.CompanyCountry,
    CompanyAddress: this.state.CompanyAddress,
    Industry: this.state.Industry,
  }

  const userEmployment_state = {
    Position: this.state.Position,
    StartDate: this.state.StartDate,
    EndDate: this.state.EndDate,
    CompanyName: this.state.CompanyName,
    CompanyCity: this.state.CompanyCity,
    CompanyState: this.state.CompanyState,
    CompanyCountry: this.state.CompanyCountry,
    CompanyAddress: this.state.CompanyAddress,
    Industry: this.state.Industry,
  }

  const resoponse = await employmentUpdate(userEmployment);
  
  if( resoponse.status == 204){
    var employmentlist_copy = [...this.state.employmentlist];
    employmentlist_copy[this.state.id].value = userEmployment_state;
    this.setState({ employmentlist: employmentlist_copy})
  }
  console.log(resoponse.message)
}



async handleGetAllHistory(e){
  e.preventDefault()

  const user = {
    NetID: this.props.NetID
  }

  const employmentlist = await employmentGetAll(user);

  if(employmentlist.status == 200){
    // console.log(employmentlist.employment)
    this.setState({ employmentlist: employmentlist.employment })
  }
}


  render() {
    return (
        <div className = 'mainPage' >
         
           
        <Container className = 'mainContent'>
        <Row>
        <Col className="order-xl-1" xl="10">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}>
          
          <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">My Employment history, NetID: {this.props.NetID}</h3>
                    </Col>
                    
                    <Col className="text-right" xs="5">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleGetAllHistory}
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
                Position (Required)
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
            </Col>
             
            <Col xs="3">
            <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Start Date
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
            </Col>
           
            <Col xs="3">  
            <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  End Date
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
            </Col>
             
          </Row>

          <Row>
            <Col xs="5">
            
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Company Name (Required)
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'CompanyName'
                  value={this.state.CompanyName}
                  onChange={this.onChange}
                />
              
              </FormGroup>
              </Col>
              <Col xs="5">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Industry
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'Industry'
                  value={this.state.Industry}
                  onChange={this.onChange}
                />
              </FormGroup>
             
                </Col>
          </Row>


          <Row>
            <Col xs="3">
              <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    City (Required)
                  </label>
                  <Input
                    className="form-control-alternative"
                    // id="input-username"
                    type="text"
                    name = 'CompanyCity'
                    value={this.state.CompanyCity}
                    onChange={this.onChange}
                  />
                
                </FormGroup>
            </Col>
          <Col xs="3">
           <FormGroup>
              <label
                className="form-control-label"
                htmlFor="input-username"
              >
                State
              </label>
              <Input
                className="form-control-alternative"
                // id="input-username"
                type="text"
                name = 'CompanyState'
                value={this.state.CompanyState}
                onChange={this.onChange}
              />
            </FormGroup>
          </Col>

            <Col xs="3">
              <FormGroup>
                <label
                  className="form-control-label"
                  htmlFor="input-username"
                >
                  Country
                </label>
                <Input
                  className="form-control-alternative"
                  // id="input-username"
                  type="text"
                  name = 'CompanyCountry'
                  value={this.state.CompanyCountry}
                  onChange={this.onChange}
                />
              </FormGroup>
           </Col>

          </Row>

          <Row>
            <Col xs="10">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Address
                  </label>
                  <Input
                    className="form-control-alternative"
                    type="text"
                    name = 'CompanyAddress'
                    value={this.state.CompanyAddress}
                    onChange={this.onChange}
                  />
                </FormGroup>
            </Col>
          </Row>
         

        

          <Row>

              <Col className="text-right" xs="8">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={this.handleAdd}
                  size="sm"
                >
                  Add
                </Button>
              </Col>

              <Col className="text-right" xs="2">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={this.handleDelete}
                  size="sm"
                >
                  Delete
                </Button>
              </Col>

              <Col className="text-right" xs="2">
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
        {/* </Container> */}
        
        

        <br />
        <br />

        {/* <Container className = "showContent">
          <Row className="align-items-center">
            {this.getAllHistory(this.state.employmentlist)}
          </Row>
        </Container> */}


        {/* <Container className = "showContent"> */}
        <Row>
        <Col className="order-xl-1" xl="10">
          <Card style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)'}}> 
          <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="3">
                           <h3 className="mb-0">Employment History</h3>
                        </Col>
                        
                     </Row>
          </CardHeader>

          <CardBody>
            <div className="employmentTable"> 
              <Table >
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
                      <th> Change</th>

                      </tr>
                  </thead>
                  <tbody>
                  {this.getAllHistory(this.state.employmentlist)}
                  </tbody>
                  </Table>
                  </div>
              </CardBody>
          </Card>
          </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Employment;
