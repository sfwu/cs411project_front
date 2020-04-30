import Recommendation from './homeContent/Recommendation';
import Profile from './homeContent/profile/Profile';
import Enrollment from './homeContent/Enrollment';
import Register from './homeContent/Register';
import Employment from './homeContent/Employment';
import Tables from './homeContent/Tables';
import Icons from './homeContent/Icons';

var routes = [
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/home"
  },
  {
    path: "/enrollment",
    name: "Course Enrollment",
    icon: "ni ni-pin-3 text-orange",
    component: Enrollment,
    layout: "/home"
  },
  {

    path: "/employment",
    name: "Employment History",
    icon: "ni ni-key-25 text-info",
    component: Employment,
    layout: "/home"
  },
  {
    path: "/recommendation",
    name: "Job Recommend",
    icon: "ni ni-bullet-list-67 text-red",
    component: Recommendation,
    layout: "/home"
  },
  {
    path: "/",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    // component: Tables,
    layout: ""
  },
  // {
  //   path: "/icons",
  //   name: "undefined",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/home"
  // }
];
export default routes;