import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./series.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination , Navigation, Autoplay} from "swiper/modules";

const Cast = () => {
  const { id } = useParams();
  const creditAPI = `https://api.themoviedb.org/3/tv/${id}/credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US%27`;
  const [cast, setCast] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const castFunc = async () => {
    try {
      if (creditAPI.length !== 0) {
        const fetchData = await fetch(creditAPI);
        const responseData = await fetchData.json();
        const cast = responseData.cast;
        setCast(cast);
      }
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    castFunc();
  }, []);
  return (
    <div className="cast_content">
      <div className="cast_title">
        <h2>Top Billed Cast</h2>
      </div>

      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="cast_swiper"
      >
        {cast.map((items) => (
          <SwiperSlide className="cast_list" key={items.id}>
            <img src={imgUrl + items.profile_path} alt={items.name} />
            <p className="text-center">{items.original_name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;
