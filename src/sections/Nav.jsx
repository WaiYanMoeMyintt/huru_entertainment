import React, { useState, useEffect } from "react";
import "../css/nav.css";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import bell from "../assets/bell.svg";
import profile from "../assets/profile.webp";

import { Link } from "react-router-dom";

import {
  Tooltip,
  ChakraProvider,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

const Nav = ({ children }) => {
  return (
    <main className="w-full relative">
      <div className="huru_navbar flex justify-between items-center flex-1 w-full z-50">
        <div className="left flex gap-5">
          <div className="logo cursor-pointer">
            <img src={menu} alt="menu" />
          </div>
          <div className="title cursor-pointer">
            <Link to="/">huru</Link>
          </div>
        </div>
        <form className="right md:hidden flex justify-between items-center gap-6">
          <div className="search  cursor-pointer">
            <Tooltip label="Search" placement="bottom-end">
              <img src={search} alt="search" />
            </Tooltip>
          </div>

          <div className="noti  cursor-pointer">
            <Tooltip label="Notifications" placement="bottom-end">
              <img src={bell} alt="bell" />
            </Tooltip>
          </div>

          <div className="profile  cursor-pointer">
            <Tooltip label="Miracle" placement="bottom-end">
              <img src={profile} alt="profile" width={40} height={40} />
            </Tooltip>
          </div>
        </form>
      </div>
      <div className="render-children">{children}</div>
    </main>
  );
};

export default Nav;
