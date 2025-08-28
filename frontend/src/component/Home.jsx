import React from "react";
import CardSwap, { Card } from "./animation/homePageCardAnimation/HomeCard";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import SplitText from "./animation/splitText/Split";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="w-full h-[calc(100vh-80px)] lg:h-[calc(100vh-120px)] relative overflow-hidden">
        <div>
          <CardSwap
            cardDistance={60}
            verticalDistance={70}
            delay={5000}
            pauseOnHover={false}
          >
            <Card>
              <div className="text-white text-center space-y-2">
                <h3 className="text-2xl font-bold">No More Backend</h3>
                {/* <p>No more backend</p> */}
                <img
                  src="https://images.unsplash.com/photo-1749303025584-0b4e15e4146b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
                  alt=""
                />
              </div>
            </Card>
            <Card>
              <div className="text-white text-center space-y-2">
                <h3 className="text-2xl font-bold">Authentication</h3>
                {/* <p>Authentication</p> */}
                <img
                  src="https://images.unsplash.com/photo-1749303025584-0b4e15e4146b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
                  alt=""
                />
              </div>
            </Card>
            <Card>
              <div className="text-white text-center space-y-2">
                <h3 className="text-2xl font-bold">CRUD Operations</h3>
                {/* <p>Crud Operations</p> */}
                <img
                  src="https://images.unsplash.com/photo-1749303025584-0b4e15e4146b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw3fHx8ZW58MHx8fHx8"
                  alt=""
                />
              </div>
            </Card>
          </CardSwap>
        </div>

        <div className="flex flex-col px-6 mt-10 lg:mt-44 lg:ml-10 lg:w-[60%]">
          <SplitText
            text="Powerful Backend APIs Built for Developers"
            className="hidden sm:block sm:text-4xl sm:px-5 text-center md:text-5xl md:px-14 lg:text-7xl font-bold lg:px-0 lg:text-left"
            delay={20}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
          />
          <h3 className="sm:hidden text-4xl font-bold text-center">
            Powerful Backend APIs Built for Developers
          </h3>
          <p className="sm:text-md md:text-lg lg:text-2xl lg:font-semibold lg:mt-7 lg:w-[80%] lg:text-left mt-4 text-md text-center">
            Build faster with reliable and easy-to-use backend APIs, crafted for
            modern developers.
          </p>
          <div className="flex justify-center lg:justify-start">
            <NavLink to="/docs">
              <button className="lg:mt-8 lg:text-xl font-bold border border-stone-700 bg-stone-800 rounded-full lg:px-6 lg:py-3 flex items-center justify-center gap-3 mt-5 px-4 py-2">
                Browse Api
                <FaRegArrowAltCircleRight />
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
