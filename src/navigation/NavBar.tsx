import { Link } from "react-router-dom";
import NavMenu from "./NavMenus";
interface NavBarPropsInterface {
  handleLogout: () => void;
}

/**
 *
 *
 * Navigation Bar
 */
//App -> NavBar -> NavLink

function NavBar({ handleLogout }: NavBarPropsInterface) {
  return (
    <header className="navbar container mx-auto">
      <div className="flex-none md:hidden">
        <label htmlFor="my-drawer" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-6 h-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <Link to="/" className="flex-1 px-2 mx-2">
        Jobly
      </Link>
      <div className="flex-none hidden md:block">
        <ul className="menu menu-horizontal">
          <NavMenu handleLogout={handleLogout} />
        </ul>
      </div>
    </header>
  );
}

export default NavBar;
