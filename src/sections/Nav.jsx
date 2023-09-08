import React, { useState, useEffect } from "react";
import "../css/nav.css";
import menu from "../assets/menu.svg";
import search from "../assets/search.svg";
import bell from "../assets/bell.svg";
import profile from "../assets/profile.webp";
import Search from "./Search";
import { navLinks } from "../data";
import { Link , useNavigate} from "react-router-dom";

import {
  Tooltip,
  ChakraProvider,
  CSSReset,
  extendTheme,
} from "@chakra-ui/react";

const Nav = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const api = `https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query=${searchValue}`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const navigate = useNavigate();
  const updateValue = (e) => {
    e.preventDefault();
    const updatedValue = e.target.value;
    setSearchValue(updatedValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchValue}`);
  };

  const [result, setResult] = useState([]);
  useEffect(() => {
    const searchData = async () => {
      try {
        const startFetch = await fetch(api);
        const responseData = await startFetch.json(); // Add await here
        setResult(responseData.results); // Use responseData.results
        console.log(responseData)
      } catch (err) {
        console.error(err.message);
      }
    };
    searchData();
  }, [api]);

  return (
    <main className="w-full relative">
      <div className="huru_navbar lg:hidden md:flex flex-col justify-between items-center flex-1 w-full z-50">
        <div className="navbar_control">
          <div className="left flex gap-5">
            <div className="title cursor-pointer">
              <Link to="/">huru</Link>
            </div>
          </div>
          <Search />
        </div>
      </div>

      <div className="large_navbar">
        <div className="large_control">
          <div className="left flex gap-5">
             <div className="title cursor-pointer">
              <Link to="/">huru</Link>
            </div>
          </div>
          <div className="right_content">
            <form onSubmit={handleSubmit} className="input_control">
               <input onChange={updateValue} type="search" placeholder="Search Movies..." />
            </form>
               {
                navLinks.map((items)=>(
                   <Link to = {`/${items.name}`} key={items.id}>
                        <h3>{items.name}</h3>
                   </Link>
                ))
               }
          </div>
        </div>
      </div>
      <div className="render-children">{children}</div>
    </main>
  );
};

export default Nav;
