import React, { useState, useEffect } from "react";
import "../css/home.css";
import star from "../assets/star.svg";
import english from "../assets/english.png";
import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";
import {
  Popular,
  Series,
  Streaming,
  Trending,
  Top,
  Upcoming,
  OnAir,
  Show,
  TodayShow,
  Rated,
  Recommend,
  Categories,
  Poster,
  Footer

} from "../sections";
import { split } from "postcss/lib/list";
const Home = () => {
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const api = 
    "https://api.themoviedb.org/3/discover/movie?api_key=1b7c076a0e4849aeefd1f3c429c99a36&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";
  const [discover, setDiscover] = useState([]);

  //fetching discover home page
  useEffect(() => {
    const discoverPage = async () => {
      try {
        const fetchData = await fetch(api);
        const response = await fetchData.json();
        const splitData = response.results.slice(0, 4);
        setDiscover(splitData);
      } catch (err) {
        return err.message;
      }
    };
    discoverPage();
  },[]);

  return (
    <header className="h-full">
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper huru_swiper"
      >
        {discover.map((movies) => (
          <Link to = {`/movies/${movies.id}/${movies.original_title}`}>
          <SwiperSlide
            className="bg-cover bg-no-repeat bg-center overlay-slide"
            style={{ backgroundImage: `url(${imgUrl + movies.backdrop_path})` }}
            key={movies.id}
          >

            <div className="home_information flex flex-col items-center justify-center gap-4 w-full">
            <h1>{movies.original_title}</h1>
              <div className="info_title flex flex-1 gap-5">
              
                <div className="date ">
                  <p>{movies.release_date.slice(0, 4)}.</p>
                </div>
                <div className="vote flex  items-center justify-center flex-row">
                  <img src={star} width={20} height={20} />
                  <p>{movies.vote_average}</p>
                </div>
                <div className="lang flex items-center justify-center gap-2">
                  <img
                    className=""
                    src={english}
                    width={40}
                    height={40}
                  />
                  <p>{movies.original_language}</p>
                </div>
              </div>
             
              <p className="overview">
                {movies.overview.slice(0, 120)}
                {"..."}
              </p>
              <div className="discover_list flex items-center justify-center gap-5">
                <Link
                  className="watch"
                  to={`/movies/${movies.id}/${movies.original_title}`}
                >
                  Watch Now
                </Link>
                <Link
                  className="list"
                  to={`/movies/${movies.id}/${movies.original_title}`}
                >
                  +Add list
                </Link>
              </div>
            </div>
          </SwiperSlide>
          </Link>
        ))}
      </Swiper>
      <Upcoming />
      <Trending />
      <Popular />
      <Top />
      <Streaming />
      <OnAir />
      <Show />
      <TodayShow />
      <Rated />
      <Recommend />
      <Categories />
      <Poster />
      <Footer />
    </header>
  );
};

export default Home;
