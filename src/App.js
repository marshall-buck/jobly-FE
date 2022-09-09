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
