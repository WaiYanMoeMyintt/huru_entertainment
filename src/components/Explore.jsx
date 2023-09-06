import React from "react";
import "./css/explore.css";
import { explore } from "./data/flim";
import { Link } from "react-router-dom";
const Explore = () => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  console.log(explore);
  return (
    <div className="explore_content">
      <div className="explore_title">
        <h2>Explore Flims Categories</h2>
      </div>
      <div className="explore_control">
        {explore.map((items) => (
          <div key={items.id}>
            <Link to={`/categories/${items.id}/${items.name}`}>
              <img src={items.poster} alt={items.name} />
            </Link>
            <p>{items.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
