import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

import {userLogin} from './components/userFunction'

import history from './components/history/history'



export default class mainPage extends React.Component {

  constructor() {
    super();
    this.state = 
    {
      NetID: '',
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    this.setState({ [e.target.name]:e.target.value })
  }

  async handleLogin(e) {
    e.preventDefault()

    const user = {
      NetID: this.state.NetID,
    }

  const resoponse = await userLogin(user);
  // see whether the user is an registered user
  // console.log(resoponse)
  if(resoponse.status == 200){
    history.push({
      pathname : '/home',
      user :{
        NetID: this.state.NetID
      }
    })
  }else{
    console.log(resoponse.message)
  }

  }

  render() {

     return (
        <div className='welcome-page'>

          <header className='welcome-page-title'>
            Welcome to ByteMe's world!
          </header>


          <div className = 'welcome-page-inputs'>
            <InputGroup size="lg">
              <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-lg">NetID</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl 
                aria-label="Large" 
                aria-describedby="inputGroup-sizing-sm" 
                name ='NetID'
                onChange={this.onChange}
                />
            </InputGroup>
          </div>
          
          <br />
          <br />

          <div className='welcome-page-buttons'>
            <div>
              <Button variant="primary" size="lg" onClick = {this.handleLogin} >
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



