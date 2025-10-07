import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";

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

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [sawPassword, setsawPassword] = useState(false);

  const handleSawPassword = () => {
    setsawPassword(!sawPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast(
        <CustomToast text="Please enter email and password" type="error" />,
        {
          autoClose: 2000,
          closeButton: false,
          hideProgressBar: true,
          style: {
            background: "transparent",
            boxShadow: "none",
            padding: 0,
            margin: 0,
          },
        }
      );
      return;
    }

    try {
      await axios.post(
  "https://backendlibraryy-fullstack-backend.onrender.com/api/user/auth/login",
        { email, password },
        { withCredentials: true }
      );

      toast(<CustomToast text="Login Successful" type="success" />, {
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
      }, 1000);
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast(<CustomToast text="Invalid Credentials" type="error" />, {
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
      } else {
        toast(<CustomToast text="Something went wrong" type="error" />, {
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
      console.error(err);
    }
  };

  // return (
  //   <div className="min-h-screen flex items-center justify-center text-xl px-4">
  //     <form onSubmit={handleSubmit} className="w-full max-w-md bg-transparent">
  //       <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
  //         Login
  //       </h2>

  //       <input
  //         type="email"
  //         placeholder="Email"
  //         value={email}
  //         onChange={(e) => setEmail(e.target.value)}
  //         className="border-b border-l border-r p-2 bg-transparent focus:outline-none w-full mb-5"
  //       />

  //       <div>
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           className="border-b border-l border-r p-2 bg-transparent focus:outline-none w-full mb-10"
  //         />
  //         {sawPassword ? (
  //           <FaRegEyeSlash
  //             className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
  //             onClick={handleSawPassword}
  //           />
  //         ) : (
  //           <FaRegEye
  //             className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
  //             onClick={handleSawPassword}
  //           />
  //         )}
  //       </div>

  //       <button
  //         type="submit"
  //         className="w-full border rounded-full px-4 py-2 hover:bg-stone-800 hover:text-white transition duration-300"
  //       >
  //         Login
  //       </button>
  //       <div className="text-center">
  //         <p className="mt-4">
  //           Don't have an account?{" "}
  //           <Link to="/user-register" className="text-white underline">
  //             Register an account
  //           </Link>
  //         </p>
  //       </div>
  //     </form>

  //     {/* Toast */}
  //     <ToastContainer
  //       position="top-center"
  //       autoClose={2000}
  //       hideProgressBar
  //       closeOnClick
  //       draggable
  //       pauseOnHover={false}
  //       newestOnTop
  //       limit={3}
  //     />
  //   </div>
  // );

  return (
    <div className="min-h-screen flex items-center justify-center text-xl px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-transparent">
        <h2 className="text-4xl sm:text-5xl font-bold mb-10 text-center">
          Login
        </h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-b border-l border-r p-2 bg-transparent focus:outline-none w-full mb-5"
        />

        <div className="relative mb-10">
          <input
            type={sawPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-b border-l border-r p-2 bg-transparent focus:outline-none w-full"
          />
          {sawPassword ? (
            <FaRegEyeSlash
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSawPassword}
            />
          ) : (
            <FaRegEye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={handleSawPassword}
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full border rounded-full px-4 py-2 hover:bg-stone-800 hover:text-white transition duration-300"
        >
          Login
        </button>
        <div className="text-center">
          <p className="mt-4">
            Don't have an account?{" "}
            <Link to="/user-register" className="text-white underline">
              Register an account
            </Link>
          </p>
        </div>
      </form>

      {/* Toast */}
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
    </div>
  );
};

export default UserLogin;
