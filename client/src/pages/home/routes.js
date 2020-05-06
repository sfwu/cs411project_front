import Recommendation from './homeContent/recommendation/Recommendation';
import Profile from './homeContent/profile/Profile';
import Enrollment from './homeContent/enrollment/Enrollment';
import Employment from './homeContent/employment/Employment';

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
    icon: "ni ni-hat-3 text-orange ",
    component: Enrollment,
    layout: "/home"
  },
  {

    path: "/employment",
    name: "Employment History",
    icon: "ni ni-world text-info",
    component: Employment,
    layout: "/home"
  },
  {
    path: "/recommendation",
    name: "Job Recommend",
    icon: "ni ni-user-run text-red",
    component: Recommendation,
    layout: "/home"
  },
  {
    path: "/",
    name: "Login",
    icon: "ni ni-sound-wave text-primary",
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