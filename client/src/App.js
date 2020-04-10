import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

import history from './components/history/history'



export default class mainPage extends React.Component {

  render() {

     return (
        <div className='welcome-page'>

          <header className='welcome-page-title'>
            Welcome to ByteMe's world!
          </header>
          <br />

          <div className = 'welcome-page-inputs'>
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">NetID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
            <br />
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg" type ='password'>Password</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
            </InputGroup>
          </div>
          
          <br />

          <div className='welcome-page-buttons'>
            <div>
              <Button variant="primary" size="lg" onClick = {() => history.push('/home')} >
                Login
              </Button>
            </div>

            <div>
              <Button variant="primary" size="lg" onClick = {() => history.push('/registration')} >
              Register!
              </Button>
            </div>
          </div>
        </div>
     )
  }
}



