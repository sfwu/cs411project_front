import React, {useEffect, useState} from "react";
import { profileUpdate, getLoginInfo } from '../../../../components/userFunction';
import axios from 'axios';

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

  constructor() {
    super();
    this.state = 
    {
      firstName: '',
      lastName: '',
      email: '',
      netid: '',
      password: '',
    }
      this.onChange = this.onChange.bind(this)
      this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  onSubmit(e){
    e.preventDefault()

    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      netid: this.state.netid,
      password: this.state.password,
    }

    profileUpdate(user).then(res =>{
        this.props.history.push('/user-profile')
    })
  }

  async componentWillMount(){
    console.log("hahahahahahahahahahahaha");
    // const info = getLoginInfo();
    // await axios.get('http://127.0.0.1:5000/api/find_user').then( res =>{
    //   console.log(res.json());
    //   const info = res.json()
    //   this.setState({
    //     firstName: info.FirstName,
    //     lastName: info.LastName,
    //     email: info.Email,
    //     netid: info.NetID,
    //     password: info.Password,
    //   })
    //   console.log("==========================================");
    // })

    const response = await fetch('http://127.0.0.1:5000/api/find_user');
    const info = response.json();
    response.json().then(data => {
      console.log("data", JSON.stringify(data, null, 4));
    })
    console.log(info);
    console.log("==========================================");

  }



  render() {

    return (
      <>
      <div className="profile_page">
        {/* <UserHeader /> */}
        <Container >
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">

                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="5">
                      <h3 className="mb-0">My account</h3>
                    </Col>
                    <Col className="text-right" xs="7">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
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
                              NetID
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-username"
                              placeholder="Username"
                              type="text"
                              name = 'netid'
                              value={this.state.netid}
                              onChange={this.onChange}
                            />
                            
                            {console.log(this.state.netid)}
                          
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Password
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-email"
                              placeholder="password"
                              type="text"
                              name = 'password'
                              value={this.state.password}
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
                              First name
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-first-name"
                              placeholder="First name"
                              type="text"
                              name ='firstName'
                              value={this.state.firstName}
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
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              // id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              name='lastName'
                              value={this.state.lastName}
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
                              // id="input-last-name"
                              placeholder="email"
                              type="text"
                              name = 'email'
                              value={this.state.email}
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
                              defaultValue="somewhere in the king's landing"
                              id="input-address"
                              placeholder="Home Address"
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
                              defaultValue="king's landing"
                              id="input-city"
                              placeholder="City"
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
                              defaultValue="United States"
                              id="input-country"
                              placeholder="Country"
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
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="Write something here to display to others later on"
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
