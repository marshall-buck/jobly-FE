import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import RoutesList from "./RoutesList";
import './App.css';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <RoutesList />
      </div>
    </BrowserRouter>
  );
}

export default App;
