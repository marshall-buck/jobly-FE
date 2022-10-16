import { NavLink } from "react-router-dom";

import { useContext } from 'react';
import UserContext from '../UserContext';
interface NavBarPropsInterface {
  handleLogout: () => void
}

/**
 *
 *
 * Navigation Bar
 */
//App -> NavBar -> NavLink

function NavBar({ handleLogout }: NavBarPropsInterface) {
  const { user } = useContext(UserContext);




  return (<div>
    <NavLink to='/'>Jobly</NavLink>

    {user && <>  <NavLink to='/companies'>Companies</NavLink>
      <NavLink to='/jobs'>Jobs</NavLink>
      <NavLink to='/profile'>Profile</NavLink>
      <NavLink to='/' onClick={handleLogout} >Log out {user.username}</NavLink>
    </>
    }

    {!user && <><NavLink to='/login'>Login</NavLink>

      <NavLink to='/signup'>Sign Up</NavLink></>}


  </div>);
}


export default NavBar;