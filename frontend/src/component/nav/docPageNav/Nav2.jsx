import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiGithub } from "react-icons/si";
import useApiGenerateCheckAuth from "../../userLoginPage/protectedRoute/ForApiGenereateCheckAuth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomToast = ({ text, type }) => {
  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 text-sm px-4 py-2 rounded shadow-lg z-50 ${
        type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"
      }`}
    >
      {text}
    </div>
  );
};

const Nav2 = () => {
  const [isAuth, setisAuth] = useState(false);
  const auth = useApiGenerateCheckAuth();
  const LOGOUT_URL = "https://backendlibraryy-fullstack-backend.onrender.com/api/user/auth/logout";
  const navigate = useNavigate();

  useEffect(() => {
    if (auth === true) {
      setisAuth(true);
    } else if (auth === false) {
      setisAuth(false);
    }
  }, [auth]);

  if (auth === null) {
    return null;
  }

  const handleLogout = async () => {
    try {
      const res = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        toast(<CustomToast text="Logout Successful" type="success" />, {
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            margin: 0,
          },
        });

        setTimeout(() => {
          navigate("/docs");
          window.location.reload();
        }, 1000);
      } else {
        toast(<CustomToast text="Logout Failed" type="error" />, {
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            margin: 0,
          },
        });
      }
    } catch (err) {
      toast(<CustomToast text="Error during logout" type="error" />, {
        autoClose: 2000,
        closeButton: false,
        hideProgressBar: true,
        style: {
          background: "transparent",
          boxShadow: "none",
          padding: 0,
          margin: 0,
        },
      });
      console.error("Error during logout:", err);
    }
  };

  return (
    <>
      {/* Static Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <div className="px-6 flex lg:ml-4 lg:mr-4 lg:p-2 font-bold justify-between items-center">
          <div className="text-2xl font-bold md:text-3xl lg:text-4xl">
            <NavLink to="/" className="cursor-pointer">
              <h3>XYZ...</h3>
            </NavLink>
          </div>

          {isAuth ? (
            <div className="flex items-center gap-5">
              <div>
                <Link to="/user-dashboard">
                  <button className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 w-fit">
                    Dashboard
                  </button>
                </Link>
              </div>
              <div>
                <button
                  onClick={handleLogout}
                  className="text-base sm:text-lg font-bold border border-stone-700 bg-stone-800 hover:bg-stone-700 transition rounded-full px-3 py-1 w-fit"
                >
                  logout
                </button>
              </div>

              <div className="py-2 lg:text-4xl text-3xl">
                <a
                  href="https://github.com/bhautik124/BackendLibrary-Fullstack.git"
                  className="flex items-center gap-2 cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGithub />
                </a>
              </div>
            </div>
          ) : (
            <div className="py-2 lg:text-4xl text-3xl">
              <a
                href="https://github.com/bhautik124/BackendLibrary-Fullstack.git"
                className="flex items-center gap-2 cursor-pointer"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SiGithub />
              </a>
            </div>
          )}
        </div>

        <div className="border-b border-stone-700" />
      </div>

      {/* Space below navbar to avoid content overlap */}
      <div className="h-[50px] lg:h-[80px]" />

      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        draggable
        pauseOnHover={false}
        newestOnTop
        limit={3}
      />
    </>
  );
};

export default Nav2;
