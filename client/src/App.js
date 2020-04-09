import React from 'react';

import { BrowserRouter as Router, Route,Switch, Redirect, useHistory } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

import Register from './pages/registration/index';
import history from './components/history/history'



export default class mainPage extends React.Component {


handleRegister = () => {
    history.push('/registration');
}




  render() {

     return (
        <div className='App'>

          <header className='header'>
            Welcome to ByteMe's world!
          </header>
          <br />

          <div className = 'inputs'>
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">User name</InputGroup.Text>
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
          </div>
          
          <br />

          <div className='buttons'>
            <div>
              <Button variant="primary" size="lg">
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



