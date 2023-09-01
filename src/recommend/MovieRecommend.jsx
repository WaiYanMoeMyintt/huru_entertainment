import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imdb from "../assets/imdb.png";
import "../movieDetail/movieDetail.css";
import Cast from "../movieDetail/Cast";
import Trailer from "../movieDetail/Trailer";
import Recommend from "../movieDetail/Recommend";
import { Footer } from "../sections/Footer";
const MovieRecommend = () => {
  const { id, name } = useParams();
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const api = `https://api.themoviedb.org/3/movie/${id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US'`;
  const img = "https://image.tmdb.org/t/p/w500/";
  const creditAPI = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US%27`;
  const [detail, setDetail] = useState();
  const [credit, setCredit] = useState([]);
  const detailFunc = async () => {
    try {
      if (api.length !== 0) {
        const fetchData = await fetch(api);
        const responseData = await fetchData.json();
        setDetail(responseData);
      }
    } catch (err) {
      return err.message;
    }
  };

  const creditFunc = async () => {
    try {
      if (api.length !== 0) {
        const fetchData = await fetch(creditAPI);
        const responseData = await fetchData.json();
        const crew = responseData.crew;
        setCredit(crew);
      }
    } catch (err) {
      return err.message;
    }
  };

  useEffect(() => {
    detailFunc();
    creditFunc();
  }, []);

  return (
    <div className="huru_detail">
      {detail && (
        <div
          key={detail.id}
          // style={{ backgroundImage: `url(${imgUrl + detail.backdrop_path})` }}
          className="detail_list"
        >
          <div className="detail_control">
            <div className="left">
              <img src={img + detail.poster_path} alt={detail.original_title} />
            </div>
            <div className="right">
              <h2 className="text-center">{detail.original_title}</h2>
              <p className="tagline text-center">{detail.tagline}</p>

              <div className="information">
                <p>{detail.release_date.slice(0, 4)}</p>
                <p>{detail.runtime}min</p>
                {detail.genres.map((items) => (
                  <Link to={`/categories/${items.name}`} key={items.id}>
                    <p>{items.name}</p>
                  </Link>
                ))}
                <p className="flex items-center justify-center gap-1 ">
                  <img src={imdb} alt="imdb" width={50} height={50} />
                  {detail.vote_average}
                  <span className="popularity">({detail.popularity})</span>
                </p>
              </div>
              <p className="overview">{detail.overview}</p>
            </div>
          </div>

          <div className="detail_cast">
            <div className="writing">
              <h2>Writer</h2>
              {credit.map((items) => (
                <div className="crew_list" key={items.id}>
                  {items.known_for_department === "Writing" ? (
                    <p>{items.name}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>
            <div className="directing">
              <h2>Director </h2>
              {credit.map((items) => (
                <div key={items.id}>
                  {items.known_for_department === "Directing" ? (
                    <p>{items.name}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>
            <div className="editing">
              <h2>Editor</h2>
              {credit.map((items) => (
                <div key={items.id}>
                  {items.known_for_department === "Editing" ? (
                    <p>{items.name}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>
            <div className="production">
              <h2>Producer </h2>
              {credit.map((items) => (
                <div key={items.id}>
                  {items.known_for_department === "Production" ? (
                    <p>{items.name}</p>
                  ) : (
                    <p></p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Cast />
          <Trailer />
          <Recommend />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default MovieRecommend;
