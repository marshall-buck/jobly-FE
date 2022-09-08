import { NavLink } from "react-router-dom";
import "./NavBar.css";
import { useContext } from 'react';
import userContext from './userContext';

/**
 *
 *
 * Navigation Bar
 */
//App -> NavBar -> NavLink

function NavBar() {
  const { user } = useContext(userContext);
  return (<div className="NavBar">
    <NavLink to='/'>Jobly</NavLink>
    <NavLink to='/companies'>Companies</NavLink>
    <NavLink to='/jobs'>Jobs</NavLink>

  </div>);
}


export default NavBar;