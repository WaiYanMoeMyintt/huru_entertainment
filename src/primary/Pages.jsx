import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PaginationItems from "./PaginationItems";
import "./css/movies.css";

const Pages = () => {
  let { id } = useParams();
  document.title = `Page ${id}`;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const api = `https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&include_adult=false&include_video=false&language=en-US&page=${id}&sort_by=popularity.desc`;
  const [pagination, setPagination] = useState([]);

  const [loading, setLoading] = useState(true);
  // Define a scrollToTop function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change this to "auto" for instant scrolling
    });
  };
  useEffect(() => {
    const paginationAPIs = async () => {
      const requestData = await fetch(api);
      try {
        if (requestData.ok) {
          const resposeData = await requestData.json();
          setPagination(resposeData.results);
          console.log(resposeData.results);
        }
      } catch (err) {
        return err.message;
      } finally {
        setLoading(false);
      }
    };
    paginationAPIs();
  }, [api]); // Add api as a dependency to avoid unnecessary re-renders

  return (
    <div className="pagination_control">
      {loading ? (
        <div className="loading">
          <div className="loading-circle"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="pagination_content_control">
          {pagination.map((items) => (
            <Link
              to={`/movies/${items.id}/${items.original_title}`}
              key={items.id}
              onClick={scrollToTop} // Call the scrollToTop function when the link is clicked
            >
              <img
                src={imgUrl + items.poster_path}
                alt={items.original_title}
              />
              <p>{items.original_title}</p>
            </Link>
          ))}
        </div>
      )}

      <div>
        <PaginationItems />
      </div>
    </div>
  );
};

export default Pages;
