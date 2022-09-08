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

function NavBar({ handleLogout }) {
  const { user } = useContext(userContext);




  return (<div className="NavBar">
    <NavLink to='/'>Jobly</NavLink>

    {user && <div>  <NavLink to='/companies'>Companies</NavLink>
      <NavLink to='/jobs'>Jobs</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/' onClick={handleLogout} >Log out {user.username}</NavLink>
    </div>
    }

    {!user && <div><NavLink to='/login'>Login</NavLink>

      <NavLink to='/signup'>Sign Up</NavLink></div>}


  </div>);
}


export default NavBar;