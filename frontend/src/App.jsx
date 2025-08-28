import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./component/Home";
import Noise from "./component/animation/wholeWebsiteFade/Fade";
import Nav from "./component/nav/homePageNav/Nav";
import Docs from "./component/Docs";
import Nav2 from "./component/nav/docPageNav/Nav2";
import DashBoard from "./component/AdminPanel/DashBoard";
import AdminLogin from "./component/AdminPanel/loginpage/AdminLogin";
import ProtectedRoute from "./component/AdminPanel/protectedRoute/ProtectedRoute";
import UserLogin from "./component/userLoginPage/signingpage/UserLogin";
import UserRegister from "./component/userLoginPage/signingpage/UserRegister";
import UserPanel from "./component/userLoginPage/userDashboard/UserPanel";
const App = () => {
  const location = useLocation();

  return (
    <>
      <div className="w-full min-h-screen relative overflow-hidden bg-black font-websiteFont text-stone-400 ">
        {location.pathname !== "/admin" &&
          location.pathname !== "/user-dashboard" && (
            <Noise
              patternSize={250}
              patternScaleX={1}
              patternScaleY={1}
              patternRefreshInterval={2}
              patternAlpha={25}
            />
          )}

        {location.pathname === "/" && <Nav />}
        {location.pathname === "/docs" && <Nav2 />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <DashBoard />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/user-dashboard" element={<UserPanel />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/user-register" element={<UserRegister />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
