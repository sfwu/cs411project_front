import React from 'react';
import './index.css';
import { Button, InputGroup, FormControl} from 'react-bootstrap';

import { userRegister } from '../../components/userFunction';

import history from '../../components/history/history'
import { FormGroup } from 'reactstrap';

export default class register extends React.Component {

  constructor() {
    super();
    this.state = 
    {
      NetID: '',
      FirstName: '',
      LastName: '',
      Email: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  async onSubmit(e){
    e.preventDefault()

    const user = {
      NetID: this.state.NetID,
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email
  }

    const resoponse = await userRegister(user);
    console.log(resoponse.message)
}

    render () {
      return (
        
          <div className='r_main'>
          <header className='r_title'>
            Let's sign up!
          </header>
          <br />

          <div className = 'r_inputs'>

            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">NetID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm" 
                name ='NetID'
                // value={this.state.NetID}
                onChange={this.onChange}
                />
            </InputGroup>

          <br />

            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm" 
                name ='FirstName'
                // value={this.state.FirstName}
                onChange={this.onChange}
                />
            </InputGroup>
            <br />
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm" 
                name ='LastName'
                // value={this.state.LastName}
                onChange={this.onChange}
                />
            </InputGroup>

            <br />
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Email</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm" 
                name ='Email'
                onChange={this.onChange}
                />
            </InputGroup>
          </div>
          
          <br />

          <div>
              <Button variant="primary" size="lg" className ='r_buttons' onClick = {this.onSubmit}>
              Register
              </Button>
            </div>
            <br />
            <div>
              <Button variant="primary" size="lg" className ='r_buttons' onClick = {() => history.push('/')} >
              Go Back to Login
              </Button>
            </div>

        </div>
      )
    }
  }