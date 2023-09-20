import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./css/movies.css";
const Movies = () => {
    document.title = "Movies"
  function getNumbers(){
      const num = 12;
      const arr = [];
      for (let i = 1; i < num; i++){
        const primary_api = `https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&include_adult=false&include_video=false&language=en-US&page=${i}&sort_by=popularity.desc`;
        arr.push(primary_api);
      }
      return arr;
  }
  getNumbers()
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [primary, setPrimary] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const apiUrls = getNumbers(); // Generate API URLs
      const promises = apiUrls.map(async (url) => {
        try {
          const response = await fetch(url); // Fetch data from the URL
          const data = await response.json(); // Parse response as JSON
          return data.results; // Return the data you want
        } catch (error) {
          console.error("Error fetching data:", error);
          return [];
        }
      });
      const results = await Promise.all(promises); // Wait for all promises to resolve
      const flattenedResults = results.flat(); // Flatten the array of results
      setPrimary(flattenedResults); // Set the state with the fetched data
    };
  
    fetchData(); // Call fetchData to start fetching data
  }, []);
  
  return (
    <div className="primary_movies_list">
      <div className="primary_title">
        <h2>Watch Best Popular Movies</h2>
      </div>

      <div className="primary_movies_content">
      {primary &&
        primary.map((items) => (
          <Link to = {`/movies/${items.id}/${items.original_title}`} key={items.id} className="primary_movies">
            <div className="poster">
              <img
                src={imgUrl + items.poster_path}
                alt={items.original_title}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
                />
              </svg>
              <p className="vote">{items.vote_average}</p>
            </div>
            <div className="detail">
              <div className="detail_info">
                <p>{items.release_date.slice(0, 4)}</p>
              </div>
              <div className="detail_title">
                <h1>{items.original_title}</h1>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Movies;
