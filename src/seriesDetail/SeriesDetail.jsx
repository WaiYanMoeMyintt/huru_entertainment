import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import imdb from "../assets/imdb.png";
import "./series.css";
import Cast from "./Cast";
// import Trailer from "./Trailer";
import Recommend from "./Recommend";
import { Footer } from "../sections/Footer";
const SeriesDetail = () => {
  const { id, name } = useParams();
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const api = `https://api.themoviedb.org/3/tv/${id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US`;
  const img = "https://image.tmdb.org/t/p/w500/";
  const creditAPI = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US%27`;
  const [detail, setDetail] = useState();
  const [credit, setCredit] = useState([]);

  document.title = name;

  const detailFunc = async () => {
    try {
      if (api.length !== 0) {
        const fetchData = await fetch(api);
        const responseData = await fetchData.json();
        setDetail(responseData);
        console.log(responseData);
      }
    } catch (err) {
      return err.message;
    }
  };
  detailFunc();

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
          className="detail_list lg:hidden sm:flex flex-col"
        >
          <div className="detail_control">
            <div className="left">
              <img src={img + detail.poster_path} alt={detail.original_name} />
            </div>
            <div className="right">
              <h2 className="text-center">{detail.original_name}</h2>
              <p className="tagline text-center">{detail.tagline}</p>

              <div className="informatio gap-2 flex justify-around items-center flex-1">
                <p>{detail.first_air_date}</p>
                <p>{detail.number_of_episodes} Episodes</p>
                <p>{detail.number_of_seasons} Seasons</p>
                {detail.genres.map((items) => (
                  <Link
                    to={`/categories/${items.id}/${items.name}`}
                    key={items.id}
                  >
                    <p className="hover:text-emerald-400 transition-transform">
                      {items.name}
                    </p>
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
          <Cast />
          <Recommend />
          <Footer />
        </div>
      )}

      <div className="home_lg_content lg:flex flex-col hidden sm:flex flex-col">
        {
          <div className="detail_lg">
            {detail ? (
              <div className="detail_lg_control relative">
                <div
                  style={{
                    backgroundImage: `url(${imgUrl + detail.backdrop_path})`,
                  }}
                  className="detail_lg_cover h-96 bg-center opacity-30  bg-cover bg-no-repeat"
                  key={detail.id}
                ></div>
                <div className="detail_lg_movies_list" key={detail.id}>
                  <div className="left w-100">
                    <img
                      className="poster"
                      src={imgUrl + detail.poster_path}
                      alt={detail.original_name}
                    />
                  </div>
                  <div className="right">
                    <h2>{detail.original_name}</h2>
                    <i className="tag_line">{detail.tagline}</i>

                    <div className="informatio lg_information gap-2 flex">
                      <p>{detail.first_air_date}</p>
                      <p>{detail.number_of_episodes} Episodes</p>
                      <p>{detail.number_of_seasons} Seasons</p>
                      {detail.genres.map((items) => (
                        <Link
                          to={`/categories/${items.id}/${items.name}`}
                          key={items.id}
                        >
                          <p className="hover:text-emerald-400 transition-transform">
                            {items.name}
                          </p>
                        </Link>
                      ))}
                      <p className="flex items-center justify-center gap-1 ">
                        <img src={imdb} alt="imdb" width={50} height={50} />
                        {detail.vote_average}
                        <span className="popularity">
                          ({detail.popularity})
                        </span>
                      </p>
                    </div>

                    <p className="lg_overview">{detail.overview}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h1>Movie not found </h1>
              </div>
            )}
          </div>
        }
        <div className="detail_cast">
          <Cast />
        </div>

        {/* <div className="trailer">
          <Trailer />
      </div> */}

        <div className="similar">
          <Recommend />
        </div>

        <div className="footer mt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default SeriesDetail;
