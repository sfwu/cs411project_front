import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
// reactstrap components
import { setState } from "react";
// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import AdminFooter from "../../components/Footers/AdminFooter.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";

import routes from "./routes.js";

import Index from './homeContent/index';
import Profile from './homeContent/profile/Profile';
import Undefined3 from './homeContent/Maps';
import Register from './homeContent/Register';
import Employment from './homeContent/Employment';
import Tables from './homeContent/Tables';
import Icons from './homeContent/Icons';




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
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/home/index",
            imgSrc: "",
            imgAlt: "I AM A PIC"
          }}
        />
        <div className="main-content" ref="mainContent"/>
        {/* <Switch>
            {this.getRoutes(routes)}
          </Switch> */}
          <Switch>
          <Route
            path= "/home/Index"
            render={() => <Index  NetID = {this.state.NetID} />}
          />
          {/* {console.log('hahaha')}
          {console.log(this.state)} */}
          <Route
            path= "/home/user-profile"
            render={() => <Profile  NetID = {this.state.NetID} />}
          />
          <Route
            path= "/home/employment"
            render={() => <Employment  NetID = {this.state.NetID} />}
          />

          </Switch>
      </>
    );
  }
}

export default Home;