import { BrowserRouter } from "react-router-dom";
import NavBar from "./NavBar";
import RoutesList from "./RoutesList";
import './App.css';

/** App Component
 *
 *
 *  App -> BrowserRouter -> (NavBar, RoutesList)
 */

function App() {

  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <RoutesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
