import React, { Suspense, lazy } from "react";
//import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const ZajezdForm = lazy(() => import('./ZajezdForm'));
const ZajezdIndex = lazy(() => import('./ZajezdIndex')); // předpokládáme, že máte komponentu pro zobrazení seznamu zájezdů

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

      <Suspense fallback={<div>Načítání...</div>}>
        <Routes>
          <Route index element={<Navigate to={"/zajezdy"} />} />
          <Route path="/zajezdy" element={<ZajezdIndex />} />
          <Route path="/vytvor" element={<ZajezdForm />} />
          <Route path="/uprav/:id" element={<ZajezdForm />} />
        </Routes>
      </Suspense>
    </div>
  </Router>
);

export default App;
