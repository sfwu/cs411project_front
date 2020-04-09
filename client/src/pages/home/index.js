import React from 'react';
import './index.css';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import history from '../../components/history/history'

export default class home extends React.Component {
    render () {
      return (
          <div className='main'>

          <header className='header'>
            This is the home page that the user will see after login!
          </header>
          <br />

        </div>
      )
    }
  }