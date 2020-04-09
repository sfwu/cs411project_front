import React from 'react';
import './index.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import history from '../../components/history/history'

export default class register extends React.Component {
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
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <br />
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          
          <br />

            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">First Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <br />
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">Last Name</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          </div>
          
          <br />

          <div>
              <Button variant="primary" size="lg" className ='r_buttons' >
              Submit
              </Button>
            </div>

        </div>
      )
    }
  }