import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./movieDetail.css";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";
const Cast = () => {
  const { id,name } = useParams();

  const creditAPI = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36&language=en-US%27`;
  const [cast, setCast] = useState([]);
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const [slidesPerView, setSlidesPerView] = useState(5);
  useEffect(() => {
    const handleResize = () => {
      // Update slidesPerView based on screen width
      if (window.innerWidth < 768) {
        setSlidesPerView(3); // For mobile devices
      } else {
        setSlidesPerView(5); // For larger screens
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to set the initial value
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
  }, [name]);
  return (
    <div className="cast_content">
      <div className="cast_title lg:w-52 md:w-full">
        <h2>Top Cast's</h2>
      </div>

      <Swiper
        slidesPerView={slidesPerView}
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
            <Link to={`/credit/${items.id}/${items.name}`}>
              {
                items.profile_path !== null ? 
                (<div>
                  <img src={imgUrl + items.profile_path} alt={items.name} />
                </div>) : (<div className="not_found">
                   <p>No Availabile</p>
                </div>)
              }
              <p className="text-center">{items.original_name}</p>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cast;
