import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import './App.css';
import userContext from "./userContext";
import { useState, useEffect } from "react";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";


/** App Component
 *
 *
 *  App -> BrowserRouter -> (NavBar, RoutesList)
 */

function App() {

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

/**
 *  Checks for token and hydrates user on load and when token is changed.
 */
  useEffect(function checkIfToken() {

    async function checkLocalStorage() {
      if (token) {
        JoblyApi.token = token;
        const payload = jwt_decode(token);
        const response = await JoblyApi.getUserData(payload.username);
        console.log("response from getUserData in useEffect in App",response);

        setUser(response);

      }
      else {
        setUser(null);
      }

    }
    checkLocalStorage();
  }, [token]);



/**
 * Handles user signup and sets token to Local Storage
 *
 * formData:
* { username, password, firstName, lastName, email}
 */
  async function handleSignup(formData) {

    const token = await JoblyApi.handleSignup(formData);
    setToken(token);
    localStorage.setItem('token', token);

  }

/**
 * Handles user login and sets token to Local Storage
 *
 * formData:
 * { username, password}
*/
  async function handleLogin(formData) {

    const token = await JoblyApi.loginUserApi(formData);
    setToken(token);
    localStorage.setItem('token', token);
  }

 /**
 * Clears state, token and local storage
 *
 */
  function handleLogout() {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    //FIXME: Do we need to set the joblyapi class token to nothing.
  }

/**
 * Updates state with new user info
 *
 * formData:
 * { firstName,lastName,email}
*/
  async function handleEditForm(formData) {
    const response = await JoblyApi.handleEditForm(formData);
    setUser(response);
    // console.log("response from handleEditForm in App",response);
  }



  return (
    <userContext.Provider value={{ user, token }}>
      <BrowserRouter>
        <NavBar handleLogout={handleLogout} />
        <div className="container">
          <RoutesList handleSignup={handleSignup} handleLogin={handleLogin} handleEditForm={handleEditForm}/>
        </div>
      </BrowserRouter>
    </userContext.Provider>

  );
}

export default App;


/**
 * assumptions, we are logged in and at the route "/companies"
 *
 * step 1) press refresh button and resets app state
 *        (token is not cleared from local storage)
 *
 *  - we run the function app, user state is null, you will have token +
 *    token state
 *
 * STEP 2) APP is rendered without a user, so when we hit return statement we fail
 * the conditional statement for user routes and route to the catch all root route.
 *
 * Step 3) Root route is rendered.
 *
 * Step 4) We are now mounting and useEffect is triggered, decoding token from
 * local storage and hydrating the state with user info.
 *
 * Step 5) Because useEffect is changing state, the page is re-rendered and
 * because we are on the landing page, it is not populated with the user info.
 *
 *
 *
 */
