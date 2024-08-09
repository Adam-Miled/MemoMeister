import { useState } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import LandingPage from "./Pages/LandingPage/LandingPage";
import MainPage from "./Pages/MainPage/MainPage";
import routes from "./routes";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const location = useLocation();
  const findCurrentRoute = () => routes.find(route => location.pathname.startsWith(route.path));
  const currentRoute = findCurrentRoute();

  return (
    <div className="App">
      {isAuthenticated ? (
        <Routes>
          <Route path="/" element={<MainPage title={currentRoute?.name} setIsAuthenticated={setIsAuthenticated} />}>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          <Route path="/*" element={<PageNotFound/>} />
          </Route>
        </Routes>
      ) : (
        <Routes>
          <Route path="/*" element={<LandingPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      )}
    </div>
  );
}

export default App;