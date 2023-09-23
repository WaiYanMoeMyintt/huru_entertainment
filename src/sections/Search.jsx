import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import search from "../assets/search.svg";
import "../css/search.css";
import menu from "../assets/menu.svg";

const Search = () => {
  const navigate = useNavigate();

  const [searchInput, setSearch] = useState("active_input");
  const [show, setShow] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const api = `https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query=${searchValue}`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const clickImage = () => {
    setShow((prev) => !prev);
  };

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
      } catch (err) {
        console.error(err.message);
      }
    };
    searchData();
  }, [api]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-between gap-2 right"
    >
      <div className="search_app">
        <div className="search  cursor-pointer">
          <div className="search_parent">
            <div className="search_control">
              <input
                onChange={updateValue}
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
      </div>

      {/* <div className="search_result">
        {result.length !== 0 ? (
          <div>
            {result.map((items) => (
              <Link to = {`/movies/${items.id}/${items.original_title}`} key={items.id} className="result_information">
                <div className="result_poster">
                  <img
                    src = {imgUrl + items.poster_path}
                    alt={items.original_title}
                  />
                </div>
                <div className="info">
                  <h4>{items.original_title}</h4>
                  <p>{items.release_date.slice(0, 4)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div> */}
    </form>
  );
};

export default Search;
