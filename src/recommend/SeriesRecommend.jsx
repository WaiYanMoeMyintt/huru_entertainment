import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import imdb from "../assets/imdb.png";
import "../seriesDetail/series.css";
import Cast from "../seriesDetail/Cast";
import Recommend from "../seriesDetail/Recommend";
import { Footer } from "../sections/Footer";
const SeriesRecommend = () => {
  const { id, name } = useParams();
  document.title = name;
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const api = `https://api.themoviedb.org/3/tv/${id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US`;
  const [series, setSeries] = useState();
  const detailFunc = async () => {
    try {
      if (api.length !== 0) {
        const fetchData = await fetch(api);
        const responseData = await fetchData.json();
        setSeries(responseData);
      }
    } catch (err) {
      return err.message;
    }
  };

  useEffect(() => {
    detailFunc();
  }, []);

  return (
    <div className="huru_series">
      {series && (
        <div className="huru_control" key={series.id}>
          <div className="series_left">
            <img src={imgUrl + series.poster_path} alt={series.original_name} />
          </div>
          <div className="series_right">
            <h2 className="text-center">{series.original_name}</h2>
            <div className="information">
              <p>{series.last_air_date.slice(0, 4)}</p>
              <p>{series.number_of_seasons} seasons</p>
              <p>{series.number_of_episodes} episodes</p>
              <p className="flex items-center justify-center gap-1 ">
                <img src={imdb} alt="imdb" width={50} height={50} />
                {series.vote_average}
                <span className="popularity">({series.popularity})</span>
              </p>
            </div>
            <p className="overview">{series.overview}</p>
          </div>
        </div>
      )}
      <Cast />

      <div className="episode_control">
        {series && (
          <div key={series.id}>
            <div className="episode_title">
              <h2> {name} Full Of Episodes</h2>
            </div>

            <div className="episodes">
              {series.seasons.map((episode) => (
                <div className="episode_information" key={episode.id}>
                  {episode.poster_path !== null ? (
                    <div className="episode_control">
                      <div className="poster">
                          <img src= {imgUrl +episode.poster_path } alt = {episode.name} />
                      </div>
                      <div className="information">
                        <h3>{episode.name}</h3>
                        <p>{episode.air_date}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="error">
                       <p>No Availabile</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Recommend />
      <Footer />
    </div>
  );
};

export default SeriesRecommend
