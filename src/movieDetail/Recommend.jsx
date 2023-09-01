import React, { useState, useEffect } from "react";
import { useParams , Link} from "react-router-dom";
import "./movieDetail.css";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Recommend = () => {
  const { id } = useParams();
  const imgUrl = "https://image.tmdb.org/t/p/original/";
  const movieRecommendAPI = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;

  const [recommend, setRecommend] = useState([]);

  const recommendFunc = async () => {
    try {
      if (movieRecommendAPI.length !== 0) {
        const fetchData = await fetch(movieRecommendAPI);
        const responseData = await fetchData.json();
        setRecommend(responseData.results);
        console.log(responseData.results);
      }
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    recommendFunc();
  }, []);

  return (
    <div className="recommend_content">
      <div className="recommend_title">
        <h2>You May Also Like</h2>
      </div>
      <Swiper
        slidesPerView={3}
        spaceBetween={10}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper popular_swiper"
      >
      {
        recommend.map((items)=>(
           <SwiperSlide key={items.id}>
           <Link target="_blank" to={`/entertainment/recommendation/${items.id}/${items.original_title}`} >
               <div className="poster">
                   <img  src = {imgUrl + items.poster_path} alt={items.original_title}/>
                   <p className="vote">{Math.round(items.vote_average * 10)/10}</p>
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
        ))
      }
      </Swiper>
    </div>
  );
};

export default Recommend;
