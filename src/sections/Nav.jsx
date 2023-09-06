import React, { useState, useEffect } from "react";
import "../css/nav.css";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import bell from "../assets/bell.svg";
import profile from "../assets/profile.webp";
import Search from "./Search";

import { Link } from "react-router-dom";

import {
  Tooltip,
  ChakraProvider,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

const Nav = ({ children}) => {
  return (
    <main className="w-full relative">
      <div className="huru_navbar flex flex-col justify-between items-center flex-1 w-full z-50">
        <div className="navbar_control">
          <div className="left flex gap-5">
            <div className="title cursor-pointer">
              <Link to="/">huru</Link>
            </div>
          </div>
          <Search />
        </div>

      </div>
      <div className="render-children">{children}</div>
    </main>
  );
};

export default Nav;
