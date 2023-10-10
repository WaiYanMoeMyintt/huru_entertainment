import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaginationItems from "./PaginationItems";
import "./css/movies.css";
const Movies = () => {
  const { id, name } = useParams();
  const api = `https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);


  useEffect(() => {
    const movieCategories = async () => {
      try {
        const fetchData = await fetch(api);
        const response = await fetchData.json();
        setMovies(response.results);
      } catch (err) {
        return err.message;
      }
    };
    movieCategories();
  }, [movies]);
  return (
    <div className="pagination_control">
      <div className="pagination_title">
        <h2>Chill with the Best Films</h2>
      </div>

      <div className="pagination_content_control">
        {movies.map((items) => (
          <Link
            to={`/movies/${items.id}/${items.original_title}`}
            key={items.id}
            target = "_blank"
          >
            <img src={imgUrl + items.poster_path} alt={items.original_title} />
            <p>{items.original_title}</p>
          </Link>
        ))}
      </div>

      <div className="pagination">
         <PaginationItems />
      </div>     
    </div>
  );
};

export default Movies;
