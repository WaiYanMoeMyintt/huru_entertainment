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
  Footer,
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
        const splitData = response.results.slice(0, 5);
        console.log(splitData);
        setDiscover(splitData);
      } catch (err) {
        return err.message;
      }
    };
    discoverPage();
  }, []);

  return (
    <header className="h-full">
      <div className="home_content">
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
          {discover.map((items) => (
            <SwiperSlide className="huru_swiper_items" key={items.id}>
              <div className="huru_poster">
                <img
                  src={imgUrl + items.poster_path}
                  alt={items.original_title}
                />
              </div>
              <div className="information">
                <p>{items.release_date.slice(0, 4)}.</p>
                <h2>{items.original_title}</h2>
                <p>{items.overview}</p>
                <Link
                  className="watch"
                  to={`/movies/${items.id}/${items.original_title}`}
                >
                  Watch Now
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="second_content">
          <Link to={"/trending"} className="trending cursor-pointer">
            <p>Trending</p>
          </Link>
          <Link to={"/latest"} className="latest cursor-pointer">
            <p>Latest</p>
          </Link>
          <Link to={"/upcoming"} className="upcoming cursor-pointer">
            <p>Upcoming</p>
          </Link>
          <Link to={"/streaming"} className="playing cursor-pointer">
            <p>Streaming</p>
          </Link>
        </div>
      </div>
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
