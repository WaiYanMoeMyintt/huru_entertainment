import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/results.css";
const Results = () => {
  const { id, name } = useParams();
  const api = `https://api.themoviedb.org/3/search/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&query=${name}`;
  const posterURL = "https://image.tmdb.org/t/p/w500";
  const [result, setResults] = useState([]);
  useEffect(() => {
    const searchMovies = async () => {
      try {
        const startFetch = await fetch(api);
        const responseData = await startFetch.json();
        setResults(responseData.results);
      } catch (err) {
        return err.message;
      }
    };
    searchMovies();
  },[name]);
  return (
    <div className="result_control">
    <div className="result_title">
          <h2>Result for: {name}</h2>
    </div>
      {result.length !== 0 ? (
        <div className="results_content">
          {result.map((items) => (
            <div className="detail_results">
              {items.poster_path !== null ? (
                <div key={items.id}>
                <Link to = {`/movies/${items.id}/${items.original_title}`}>
                <img
                  src={posterURL + items.poster_path}
                  alt={items.original_title}
                />
                </Link>
                </div>
              ) : (
                <div className="not_found">
                  <h2>Unavailable</h2>
                </div>
              )}
              <p>{items.release_date.slice(0, 4)}</p>
              <h1>{items.original_title}</h1>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2>Sorry! We couldn't found result for {name}</h2>
        </div>
      )}
    </div>
  );
};

export default Results;
