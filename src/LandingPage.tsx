import { useContext } from "react";
import { Link } from "react-router-dom";
import coverImage from "./images/pexels-karolina-grabowska-4207909.jpg";

import UserContext from "./auth/UserContext";

/**
 * Landing Page
 *
 * App -> Routes -> LandingPage
 */

function LandingPage() {
  const { user } = useContext(UserContext);

  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${coverImage})` }}
    >
      <div className="hero-overlay bg-opacity-80">
        <div className="hero-content flex-col  min-h-screen m-auto">
          <div className="text-center">
            {user && <h1 className="text-3xl lg:text-5xl font-bold text-primary-content"> Welcome back to your job search {user.firstName}</h1>}
            {!user && (
              <div className="text-center">
                <h1 className="text-5xl font-bold text-primary-content">
                  Welcome to the job search!
                </h1>
                <p className="py-6">
                  Login to start your job search, or sign up for new account.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Link to={"/login"}>
                    <button className="btn btn-secondary w-40">Login</button>
                  </Link>
                  <Link to={"/signup"}>
                    <button className="btn btn-primary w-40">Sign Up</button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
