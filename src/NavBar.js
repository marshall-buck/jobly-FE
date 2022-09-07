import { NavLink } from "react-router-dom";
import "./NavBar.css";

/**
 *
 *
 * Navigation Bar
 */
//App -> NavBar -> NavLink

function NavBar() {
  return (<div className="NavBar">
    <NavLink to='/'>Jobly</NavLink>
    <NavLink to='/companies'>Companies</NavLink>
    <NavLink to='/jobs'>Jobs</NavLink>

  </div>);
}


export default NavBar;