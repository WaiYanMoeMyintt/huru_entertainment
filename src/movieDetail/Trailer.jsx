import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


const Trailer = () => {
  const { id } = useParams();
  const videosUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;

  const [video, setVideo] = useState([]);
  const videoFunc = async () => {
    try {
      if (videosUrl.length !== 0) {
        const fetchData = await fetch(videosUrl);
        const responseData = await fetchData.json();
        const trailer = responseData.results;
        setVideo(trailer);
        console.log(trailer);
      }
    } catch (err) {
      return err.message;
    }
  };
  useEffect(() => {
    videoFunc();
  }, []);

  return (
    <div className="video_content">
      <div className="video_title">
        <h2>Watch Trailers</h2>
      </div>

      {video && (
        <div className="trailers w-full flex justify-start items-start flex-col">
          {video.map((trailers) => (
            <iframe
              src={`https://www.youtube.com/embed/${trailers.key}`}
              title={`{trailers.name}`}
              key={trailers.id}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write;
                   encrypted-media; gyroscope; picture-in-picture;
                    web-share"
              allowfullscreen
            ></iframe>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trailer;
