import { BrowserRouter } from "react-router-dom";
import NavBar from "./navigation/NavBar";
import RoutesList from "./navigation/RoutesList";

import UserContext from "./userContext";
import { useState, useEffect } from "react";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";
import { FormEditUser, FormLoginUser, FormSignupUser, TokenPayload, User } from "./interfaces";

interface UserStateInterface {
  data: User | null
  isLoading?: boolean;
}


/** App Component
 *
 *
 *  App -> BrowserRouter -> (NavBar, RoutesList)
 */

function App() {

  const [user, setUser] = useState<UserStateInterface>({ data: null, isLoading: true });
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  /**
   *  Checks for token and hydrates user on load and when token is changed.
   */
  useEffect(function checkIfToken() {

    async function checkLocalStorage() {
      if (token) {
        JoblyApi.token = token;
        const payload: TokenPayload = jwt_decode(token);
        const response = await JoblyApi.getUserData(payload.username);

        setUser({ data: response, isLoading: false });

      }
      else {
        setUser({ data: null, isLoading: false });
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
  async function handleSignup(formData: FormSignupUser): Promise<void> {

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
  async function handleLogin(formData: FormLoginUser): Promise<void> {

    const token = await JoblyApi.loginUserApi(formData);
    setToken(token);
    localStorage.setItem('token', token);
  }

  /**
  * Clears state, token and local storage
  *
  */
  function handleLogout():void {
    setToken(null);
    setUser({ data: null, isLoading: true });
    JoblyApi.token = null;
    localStorage.removeItem('token');
  }

  /**
   * Updates state with new user info
   *
   * formData:
   * { firstName,lastName,email}
  */
  async function handleEditForm(formData: FormEditUser): Promise<void> {
    const response = await JoblyApi.handleEditForm(formData);
    setUser((user) => {
        return {
          ...user,
          data: response
        }
    });
  }

  /**
   * waiting for user data to hydrate
   */


  if (user.isLoading) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <UserContext.Provider value={{ user: user.data, token }}>
      <BrowserRouter>
        <NavBar handleLogout={handleLogout} />
        <div className="container">
          <RoutesList handleSignup={handleSignup} handleLogin={handleLogin} handleEditForm={handleEditForm} />
        </div>
      </BrowserRouter>
    </UserContext.Provider>

  );
}

export default App;
