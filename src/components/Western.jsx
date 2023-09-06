import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/global.css";
const Western = () => {
    const {id, name} = useParams()
  const api =
    `https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&with_genres=${id}`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const movieCategories = async () => {
      try {
        const fetchData = await fetch(api);
        const response = await fetchData.json();
        setLoading(false);
        setMovies(response.results);
      } catch (err) {
        return err.message;
      }
      finally{
        setLoading(true)
      }
    };
    movieCategories();
  }, [movies]);
  return (
    <div className="movie_content_control relative">
      <div className="movie_title">
        <h2>Huru best {name} Films</h2>
      </div>

      <div className="movies_content relative">
        {movies.map((items) => (
          <div>
            {loading !== true ? (
              <div className="loading_effect"></div>
            ) : (
              <Link to = {`/movies/${items.id}/${items.original_title}`} key={items.id}>
                <img
                  src={imgUrl + items.poster_path}
                  alt={items.original_title}
                />
                <p>{items.original_title}</p>
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="banner w-100 flex justify-center items-center  text-center">
        <p>End of the results.</p>
      </div>
    </div>
  );
};

export default Western;
