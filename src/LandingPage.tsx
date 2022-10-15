import { useContext } from 'react';
import UserContext from './userContext';





/**
 * Landing Page
 *
 * App -> Routes -> LandingPage
 */

function LandingPage() {

  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>Welcome to the Jungle</h1>
      {user && <p> Welcome back: {user.firstName}</p>

      }

    </div>


  );
}


export default LandingPage;