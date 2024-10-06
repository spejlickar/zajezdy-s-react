import React from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import ZajezdForm from './ZajezdForm';
import ZajezdIndex from './ZajezdIndex';

const App = () => (
  <Router>
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <ul className="navbar-nav mr-auto d-flex flex-row">
          <li className="nav-item">
            <Link to={"/zajezdy"} className="nav-link">
              Zájezdy
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/vytvor"} className="nav-link">
              Vytvoř nový
            </Link>
          </li>
        </ul>
      </nav>

      
        <Routes>
          <Route path="home/spravce" element={<Navigate to={"/zajezdy"} />} />
          <Route path="/zajezdy" element={<ZajezdIndex />} />
          <Route path="/vytvor" element={<ZajezdForm />} />
          <Route path="/uprav/:id" element={<ZajezdForm />} />
        </Routes>
      
    </div>
  </Router>
);

export default App;
