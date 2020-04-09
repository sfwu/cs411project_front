import Index from './homeContent/index';
import Profile from './homeContent/profile/Profile';
import Undefined3 from './homeContent/Maps';
import Register from './homeContent/Register';
import Login from './homeContent/Login';
import Tables from './homeContent/Tables';
import Icons from './homeContent/Icons';

var routes = [
  {
    path: "/index",
    name: "undefined",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/home"
  },
  {
    path: "/icons",
    name: "undefined",
    icon: "ni ni-planet text-blue",
    component: Icons,
    layout: "/home"
  },
  {
    path: "/undefined3",
    name: "undefined",
    icon: "ni ni-pin-3 text-orange",
    component: Undefined3,
    layout: "/home"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/home"
  },
  {
    path: "/tables",
    name: "undefined",
    icon: "ni ni-bullet-list-67 text-red",
    component: Tables,
    layout: "/home"
  },
  {
    path: "/login",
    name: "undefined",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/home"
  }
];
export default routes;