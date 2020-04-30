import React, {useEffect, useState} from "react";
import axios from 'axios';
import { profileModify, profileUpdate } from '../../../../components/userFunction'

//deal with nodejs

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
// import UserHeader from "../../../../components/header/UserHeader";

export default class Profile extends React.Component {

  // const [movies, setMovies] = useState([]);

  constructor(props) {
    super(props);
    this.state = 
    {
      FirstName: "",
      LastName: '',
      Email: '',
      Graduation: '',
      Major: '',
      Address: "",
      City: "",
      PostalCode: "",
      State: "",
      AboutMe: "",
      Country: "",
    }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
      this.handleModify = this.handleModify.bind(this)
      this.handleUpdate = this.handleUpdate.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  onSubmit(e){
    e.preventDefault()

    const user = {
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
      Email: this.state.email
    }

    profileUpdate(user).then(res =>{
        this.props.history.push('/user-profile')
    })
  }

 handleModify(e){
    e.preventDefault()
    this.getUserInfo();
  }

  handleUpdate(e){
    e.preventDefault()
    this.updateUserInfo();
  }

  async getUserInfo(){
    const user = {
      NetID: this.props.NetID
    }

    const userInfo = await profileModify(user);
    // console.log(userInfo)
    if( userInfo.status == 200 ){
      this.setState({
            FirstName: userInfo.profile.FirstName, 
            LastName: userInfo.profile.LastName, 
            Email: userInfo.profile.Email, 
            Graduation: userInfo.profile.Graduation, 
            Major: userInfo.profile.Major,
            AboutMe: userInfo.profile.AboutMe,
            Address: userInfo.profile.Address,
            City: userInfo.profile.City,
            PostalCode: userInfo.profile.PostalCode,
            State: userInfo.profile.State,
            Country: userInfo.profile.Country,
          })
    }
    console.log(this.state)
  }

  async updateUserInfo(){

    const user = {
      NetID: this.props.NetID,
      FirstName: this.state.FirstName, 
      LastName: this.state.LastName, 
      Email: this.state.Email, 
      Graduation: this.state.Graduation, 
      Major: this.state.Major,
      AboutMe: this.state.AboutMe,
      Address: this.state.Address,
      City: this.state.City,
      PostalCode: this.state.PostalCode,
      State: this.state.State,
      Country: this.state.Country,
    }

    const response = await profileUpdate(user);
  }

  render() {

    return (
      <>
      {/* {console.log('this is profile 0 ')}
      {console.log(this.props.NetID)}
      {console.log('this is profile 1 ')} */}
      <div className="profile_page">
        {/* <UserHeader /> */}
        <Container >
          <Row>

            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">

                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">My account NetID:{this.props.NetID}</h3>
                    </Col>
                    <Col className="text-right" xs="5">
                      <Button
                        color="primary"
                        href="#pablo"
                        // value = {this.props.id}
                        onClick={this.handleModify}
                        size="sm"
                      >
                        Modify
                      </Button>
                    </Col>
                    <Col className="text-right" xs="2">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={this.handleUpdate}
                        size="sm"
                      >
                        Save
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-username"
                              placeholder= "First Name"
                              type="text"
                              name = 'FirstName'
                              value = {this.state.FirstName}
                              onChange={this.onChange}
                            />
                          
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-email"
                              placeholder="Last name"
                              type="text"
                              name = 'LastName'
                              value = {this.state.LastName}
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Major
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-first-name"
                              placeholder="your major"
                              type="text"
                              name ='Major'
                              value = {this.state.Major}
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Graduation
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-last-name"
                              placeholder="your graduation date"
                              type="text"
                              name='Graduation'
                              value = {this.state.Graduation}
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                      <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Email address
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="your email"
                              type="text"
                              name = 'Email'
                              value={this.state.Email}
                              onChange={this.onChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Address
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-address"
                              placeholder="somewhere in the king's landing"
                              name = "Address"
                              value = {this.state.Address}
                              onChange={this.onChange}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              City
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="king's landing"
                              value={this.state.City}
                              onChange={this.onChange}
                              name="City"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Country
                            </label>
                            <Input
                              className="form-control-alternative"
                              placeholder="United States"
                              value = {this.state.Country}
                              onChange={this.onChange}
                              name="Country"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Postal code
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              placeholder="Postal code"
                              value = {this.state.PostalCode}
                              onChange={this.onChange}
                              name="PostalCode"
                              type="number"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Description */}
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder= "write something here!"
                          rows="4"
                          value = {this.state.AboutMe}
                          onChange={this.onChange}
                          // defaultValue="Write something here to display to others later on"
                          name="AboutMe"
                          type="textarea"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      
      </div>
      </>
    );
  }
}
