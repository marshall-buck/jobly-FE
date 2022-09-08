import { useContext } from 'react';
import userContext from './userContext';
import { Link } from 'react-router-dom';


/**
 * Landing Page
 *
 * App -> Routes -> LandingPage
 */

function LandingPage() {

  const { user } = useContext(userContext);
  return (
    <div>
      <h1>Welcome to the Jungle</h1>
      {user
        ? <p> Welcome back: {user}</p>
        : <div> <Link to='/login'>Log In</Link>
          <Link to='/signup'>Sign Up</Link>
        </div>
      }

    </div>


  );
}


export default LandingPage;