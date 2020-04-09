import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import AdminNavbar from "../../components/Navbars/AdminNavbar.js";
import AdminFooter from "../../components/Footers/AdminFooter.js";
import Sidebar from "../../components/Sidebar/Sidebar.js";

import routes from "./routes.js";




class Home extends React.Component {



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
  };
 
  render() {
    return (
      <>
        <Sidebar
          {...this.props}
          routes={routes}
          logo={{
            innerLink: "/home/index",
            imgAlt: "I AM A PIC"
          }}
        />
        <div className="main-content" ref="mainContent"/>
        <Switch>
            {this.getRoutes(routes)}
            {/* <Redirect from="*" to="/home/index" /> */}
          </Switch>
      </>
    );
  }
}

export default Home;