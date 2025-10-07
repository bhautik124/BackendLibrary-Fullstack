import React from "react";
import { NavLink } from "react-router-dom";
import { SiGithub } from "react-icons/si";

const Nav = () => {
  return (
    <>
      <div className="h-20 flex lg:mt-10 lg:pl-14 font-bold justify-around items-center">
        <div className="text-3xl font-bold md:text-4xl lg:text-5xl">
          <NavLink to="/" className="cursor-pointer">
            <h3>XYZ...</h3>
          </NavLink>
        </div>

        <div className="hidden  md:text-xl md:px-5 md:py-2 md:flex lg:text-2xl md:gap-20 md:border md:border-stone-700 lg:px-6 lg:py-3 md:rounded-full">
          <NavLink to="/" className="cursor-pointer">
            <h3>Home</h3>
          </NavLink>
          <NavLink to="/docs" className="cursor-pointer">
            <h3>Docs</h3>
          </NavLink>
        </div>

        <div className="text-xl px-3 py-2 lg:flex lg:text-2xl lg:gap-5 border border-stone-700 lg:px-6 lg:py-3 rounded-full">
          <a
            href="https://github.com/bhautik124/BackendLibrary---Fullstack.git"
            className="flex items-center gap-2 cursor-pointer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <SiGithub />
            <span>Github</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Nav;
