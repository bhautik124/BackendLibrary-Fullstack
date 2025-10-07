import React, { useState, useEffect, useRef } from "react";
import { IoDocumentsSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa";
import Intoduction from "./docDetails/Introdution/Intoduction";
import BeginnerLogin from "./docDetails/begginerAuth/login/BeginnerLogin";
import BeginnerRegister from "./docDetails/begginerAuth/register/BeginnerRegister";
import BeginnerLogout from "./docDetails/begginerAuth/logout/BeginnerLogout";
import EmailOTPAuthRegister from "./docDetails/emailOtpAuth/register/EmailOTPAuthRegister";
import EmailOTPAuthLogin from "./docDetails/emailOtpAuth/login/EmailOTPAuthLogin";
import EmailOTPAuthLogout from "./docDetails/emailOtpAuth/logout/EmailOTPAuthLogout";
import SignUp from "./docDetails/googleAuth/signup/SignUp";
import Logout from "./docDetails/googleAuth/logout/Logout";
import RoleBaseRegister from "./docDetails/roleBasedAuth/register/RoleBaseRegister";
import RoleBaseLogin from "./docDetails/roleBasedAuth/login/RoleBaseLogin";
import RoleBaseLogout from "./docDetails/roleBasedAuth/logout/RoleBaseLogout";
import Create from "./docDetails/crudWithoutImg/create/Create";
import UpdateStep1 from "./docDetails/crudWithoutImg/update/UpdateStep1";
import DeleteFieldStep1 from "./docDetails/crudWithoutImg/deleteSpecifiecField/DeleteFieldStep1";
import DeleteWholeModelStep1 from "./docDetails/crudWithoutImg/deleteWholeModel/DeleteWholeModelStep1";
import GetCreatedModel1 from "./docDetails/crudWithoutImg/GetCreatedModelList/GetCreatedModel1";
import CreateWithImg from "./docDetails/crudWithImg/create/CreateWithImg";
import WithImgUpdateStep1 from "./docDetails/crudWithImg/update/WithImgUpdateStep1";
import WithImgDeleteFieldStep1 from "./docDetails/crudWithImg/deleteSpecifiecField/WithImgDeleteFieldStep1";
import WithImgDeleteWholeModelStep1 from "./docDetails/crudWithImg/deleteWholeModel/WithImgDeleteWholeModelStep1";
import WithImgGetCreatedModel1 from "./docDetails/crudWithImg/GetCreatedModelList/WithImgGetCreatedModel1";
import GetBackupOfData from "./docDetails/dataBackup/GetBackupOfData";
import Community from "./docDetails/community/Community";

const Docs = () => {
  const navItems = [
    {
      title: "Authentication",
      items: [
        {
          title: "Beginner Auth",
          subItems: ["Beginner Register", "Beginner Login", "Beginner Logout"],
        },
        {
          title: "Email OTP Auth",
          subItems: [
            "Email OTP Auth Register",
            "Email OTP Auth Login",
            "Email OTP Auth Logout",
          ],
        },
        {
          title: "Google Auth",
          subItems: ["Signup", "Logout"],
        },
        {
          title: "Role-based Auth",
          subItems: [
            "Role-based-Register",
            "Role-based-Login",
            "Role-based-Logout",
          ],
        },
      ],
    },
    {
      title: "CRUD",
      items: [
        {
          title: "Without Image",
          subItems: [
            "Create",
            "Update",
            "Delete-Specific-Field",
            "Delete-Whole-Model",
            "Get-Created-ModelList",
          ],
        },
        {
          title: "With Image",
          subItems: [
            "- Create",
            "- Update",
            "- Delete-Specific-Field",
            "- Delete-Whole-Model",
            "- Get-Created-ModelList",
          ],
        },
      ],
    },
    {
      title: "Data Backup",
      items: ["Get-Backup-Of-Data"],
    },
    {
      title: "Community",
      items: ["Sample"],
    },
  ];

  const componentMap = {
    Introduction: <Intoduction />,
    ["Beginner Register"]: <BeginnerRegister />,
    ["Beginner Login"]: <BeginnerLogin />,
    ["Beginner Logout"]: <BeginnerLogout />,
    ["Email OTP Auth Register"]: <EmailOTPAuthRegister />,
    ["Email OTP Auth Login"]: <EmailOTPAuthLogin />,
    ["Email OTP Auth Logout"]: <EmailOTPAuthLogout />,
    ["Signup"]: <SignUp />,
    ["Logout"]: <Logout />,
    ["Role-based-Register"]: <RoleBaseRegister />,
    ["Role-based-Login"]: <RoleBaseLogin />,
    ["Role-based-Logout"]: <RoleBaseLogout />,
    ["Create"]: <Create />,
    ["Update"]: <UpdateStep1 />,
    ["Delete-Specific-Field"]: <DeleteFieldStep1 />,
    ["Delete-Whole-Model"]: <DeleteWholeModelStep1 />,
    ["Get-Created-ModelList"]: <GetCreatedModel1 />,
    ["- Create"]: <CreateWithImg />,
    ["- Update"]: <WithImgUpdateStep1 />,
    ["- Delete-Specific-Field"]: <WithImgDeleteFieldStep1 />,
    ["- Delete-Whole-Model"]: <WithImgDeleteWholeModelStep1 />,
    ["- Get-Created-ModelList"]: <WithImgGetCreatedModel1 />,
    ["Get-Backup-Of-Data"]: <GetBackupOfData />,
    ["Sample"]: <Community />,
  };

  const [expandedItem, setExpandedItem] = useState(null);
  const [expandedSubItem, setExpandedSubItem] = useState(null);
  const [selected, setSelected] = useState("Introduction");
  const [showSidebar, setShowSidebar] = useState(false);

  // ***************************************
  // page scroll autometic to top
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selected]);
  // ***************************************

  const handleSawSubNav = (title) => {
    setExpandedItem((prev) => (prev === title ? null : title));
    setExpandedSubItem(null);
  };

  const handleSubItemToggle = (subTitle) => {
    setExpandedSubItem((prev) => (prev === subTitle ? null : subTitle));
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const getBreadcrumb = () => {
    if (selected === "Introduction") return "Introduction";

    for (let main of navItems) {
      for (let sub of main.items) {
        if (typeof sub === "string") {
          if (sub === selected) return `${main.title} > ${sub}`;
        } else {
          if (sub.subItems.includes(selected))
            return `${main.title} > ${sub.title} > ${selected}`;
        }
      }
    }
    return selected;
  };

  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      {/* Responsive Top Bar for mobile + tablet */}
      <div className="block lg:hidden w-full p-2 border-b border-stone-600 bg-black flex gap-2 items-center justify-between">
        <button onClick={() => setShowSidebar((prev) => !prev)}>
          <FaBars className="text-xl text-white" />
        </button>
        <div className="text-white text-sm font-medium truncate">
          {getBreadcrumb()}
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar (responsive) */}
        <div
          className={`lg:block absolute lg:relative top-0 left-0 z-40 w-full md:w-64 h-full bg-black lg:bg-transparent border-r border-stone-700 p-4 overflow-y-auto transition-transform transform ${
            showSidebar ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:w-1/4 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent`}
        >
          <div className="flex items-center gap-2 mb-3">
            <IoDocumentsSharp className="text-2xl" />
            <h2
              onClick={() => {
                setSelected("Introduction");
                setShowSidebar(false);
              }}
              className={`text-xl lg:text-2xl font-bold cursor-pointer ${
                selected === "Introduction"
                  ? "text-zinc-100"
                  : "hover:text-zinc-100"
              }`}
            >
              Documentation
            </h2>
          </div>

          <div className="space-y-1 lg:space-y-2 text-sm lg:text-base">
            {navItems.map((item) => (
              <div key={item.title} className="space-y-1">
                <h3
                  className={`cursor-pointer pl-3 py-1 border-l-4 transition-all duration-200 text-lg ${
                    expandedItem === item.title
                      ? "text-zinc-100 font-semibold border-l-zinc-100"
                      : "border-l-transparent hover:border-l-stone-700 hover:text-zinc-100"
                  }`}
                  onClick={() => handleSawSubNav(item.title)}
                >
                  {item.title}
                </h3>

                {expandedItem === item.title && (
                  <div className="ml-4 space-y-1 lg:space-y-2">
                    {item.items.map((subItem) =>
                      typeof subItem === "string" ? (
                        <p
                          key={subItem}
                          className={`text-md cursor-pointer pl-3 py-1 border-l-4 transition-all duration-200 ${
                            selected === subItem
                              ? "text-zinc-100 font-semibold border-l-zinc-100"
                              : "border-l-transparent hover:border-l-stone-700 hover:text-zinc-100"
                          }`}
                          onClick={() => {
                            setSelected(subItem);
                            setShowSidebar(false);
                          }}
                        >
                          {subItem}
                        </p>
                      ) : (
                        <div key={subItem.title}>
                          <li
                            className="list-disc list-inside text-md font-semibold pl-3 py-1 cursor-pointer hover:text-zinc-100 text-stone-400"
                            onClick={() => handleSubItemToggle(subItem.title)}
                          >
                            {subItem.title}
                          </li>

                          {expandedSubItem === subItem.title && (
                            <div className="ml-6 space-y-1">
                              {subItem.subItems.map((nested) => (
                                <p
                                  key={nested}
                                  className={`mt-1 text-md cursor-pointer pl-3 py-1 border-l-4 transition-all duration-200 ${
                                    selected === nested
                                      ? "text-zinc-100 font-semibold border-l-zinc-100"
                                      : "border-l-transparent hover:border-l-stone-700 hover:text-zinc-100"
                                  }`}
                                  onClick={() => {
                                    setSelected(nested);
                                    setShowSidebar(false);
                                  }}
                                >
                                  {nested}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div
          ref={contentRef}
          className="flex-1 max-h-screen overflow-y-auto p-4 lg:p-6 scrollbar-thin scrollbar-thumb-stone-700 scrollbar-track-transparent text-sm lg:text-base"
        >
          {componentMap[selected] || (
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-4">
                {selected}
              </h1>
              <p className="text-base lg:text-lg">Details coming soon...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Docs;
