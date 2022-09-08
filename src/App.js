import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import './App.css';
import userContext from "./userContext";
import {useState} from "react";
import JoblyApi from "./api";
import jwt_decode from "jwt-decode";

// const jwt = require("jsonwebtoken");

/** App Component
 *
 *
 *  App -> BrowserRouter -> (NavBar, RoutesList)
 */

function App() {


  const[user, setUser] = useState(null);
  const[token, setToken] = useState(null);

  async function handleSignup(formData){

    const token = await JoblyApi.handleSignup(formData);
    // setToken(token);

    // JoblyApi.token = token;

    // const payload = jwt_decode(token);
    // setUser(payload);
  }



  return (
    <userContext.Provider value={{user,token}}>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <RoutesList handleSignup={handleSignup} />
        </div>
      </BrowserRouter>
    </userContext.Provider>

  );
}

export default App;
