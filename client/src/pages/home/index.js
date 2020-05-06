import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// reactstrap components
import { setState } from "react";
// core components
import Sidebar from "../../components/Sidebar/Sidebar.js";

import routes from "./routes.js";

import Recommendation from './homeContent/recommendation/Recommendation';
import Profile from './homeContent/profile/Profile';
import Enrollment from './homeContent/enrollment/Enrollment'
import Employment from './homeContent/employment/Employment';
import './index.css'





class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = 
    {
      NetID: ''
    }
    
  }

  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/home") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  }


  // componentDidMount()
  // {
  //   this.setState({ NetID: this.props.location.user.NetID })
  //   // const NetID = this.props.location.user.NetID;
  //   console.log("hahahah")
  //   console.log(this.props.location.user.NetID);
  // }

  componentDidMount()
  {
    if (this.props.location.user)
    {
   
        let params = this.props.location.user;
        this.setState({ NetID: params.NetID});

    }
    
  }
 
  render() {

    return (
      <div className='page'>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/home/user-profile",
            imgSrc: require('../../assets/ByteMe/pacman.jpg')
            // imgAlt: "I AM A PIC"
          }}
        />
        <div className="main-content" ref="mainContent"/>
        {/* <Switch>
            {this.getRoutes(routes)}
          </Switch> */}
          <Switch>
          <Route
            path= "/home/user-profile"
            render={() => <Profile  NetID = {this.state.NetID} />}
          />
          <Route
            path= "/home/enrollment"
            render={() => <Enrollment  NetID = {this.state.NetID} />}
          />
          <Route
            path= "/home/employment"
            render={() => <Employment  NetID = {this.state.NetID} />}
          />
          <Route
            path= "/home/recommendation"
            render={() => <Recommendation  NetID = {this.state.NetID} />}
          />
          </Switch>
      </div>
    );
  }
}

export default Home;