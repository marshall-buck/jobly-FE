import { Link } from "react-router-dom";

import { useContext } from "react";
import UserContext from "../context/UserContext";

interface NavBarPropsInterface {
  handleLogout: () => void;
}

/** Component to render nav menu based on user */
function NavMenu({ handleLogout }: NavBarPropsInterface) {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
        <>
          <li>
            <Link to="/companies">Companies</Link>
          </li>
          <li>
            <Link to="/jobs">Jobs</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link data-cy={"logout"} to="/" onClick={handleLogout}>
              Log Out {user.firstName}
            </Link>
          </li>
        </>
      )}
      {!user && (
        <>
          <li>
            <Link data-cy={"login"} to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link data-cy={"signup"} to="/signup">
              Sign Up
            </Link>
          </li>
        </>
      )}
    </>
  );
}

export default NavMenu;
