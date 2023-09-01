import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import "../css/popular.css";
import { Link } from "react-router-dom";

const Popular = () => {
  const dateObject = new Date();

  const date = dateObject.toUTCString();
  const currentDay = date.split(" ");
  const day = currentDay.slice(0,3).join(' ');
  
  
  const api =
    "https://api.themoviedb.org/3/movie/popular?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US&page=1";
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [popular, setPopular] = useState([]);
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const fetchData = await fetch(api);
        const responseData = await fetchData.json();
        setPopular(responseData.results);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchPopular();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const detailPromises = popular.map((item) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${item.id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US`
          ).then((response) => response.json())
        );
        const detailResponses = await Promise.all(detailPromises);
        setDetail(detailResponses);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="popular_list mt-5">
      <div className="popular_title">
        <h2>Popular Movies on  {day}</h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper popular_swiper"
      >
        {popular.map((items, index) => (
          <SwiperSlide key={items.id}>
          <Link to = {`/series/${items.id}/${items.original_name}`}> 
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Popular;
