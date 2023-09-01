import React, { useState, useEffect } from "react";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import noti from "../assets/bell.svg";
import profile from "../assets/profile.webp";
import "../css/search.css";
import menuLogo from "../assets/menu.svg";

import {
  Tooltip,
  ChakraProvider,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

const Search = () => {
  const [searchInput, setSearch] = useState("active_input");
  const [show, setShow] = useState(true);
  const clickImage = () => {
    setShow((prev) => !prev);
  };
  return (
    <form className="flex items-center justify-between gap-2 right">
      <div className="search  cursor-pointer">
        <div className="search_parent">
          <div className="search_control">
            <input
              className={`${show ? "input" : searchInput}`}
              type="text"
              placeholder="Search Movies..."
            />
          </div>
          <div className="search_icon">
            <img
              onClick={clickImage}
              className="search_img"
              src={search}
              alt="search"
            />
          </div>
        </div>
      </div>
      <div className="logo cursor-pointer">
        <img src={menu} alt="menu" />
      </div>
    </form>
  );
};

export default Search;
