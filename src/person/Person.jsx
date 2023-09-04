import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import "./person.css";

const Person = () => {
  const { id } = useParams();
  const creditMovies = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;
  const personAPI = `https://api.themoviedb.org/3/person/${id}?api_key=1b7c076a0e4849aeefd1f3c429c99a36`;

  // Set the essential image path
  const imgUrl = "https://image.tmdb.org/t/p/original/";

  const [person, setPerson] = useState([]);
  const [credit, setCredit] = useState([]);

  // fetch the personal information data
  useEffect(() => {
    const fetchPerson = async () => {
      const requestPerson = await fetch(personAPI);
      const responseData = await requestPerson.json();
      console.log(responseData)
      setPerson(responseData);
    };
    fetchPerson();
  }, [personAPI]);

  // fetch the creditMovies Data
  useEffect(() => {
    const fetchMovies = async () => {
      const requestPerson = await fetch(creditMovies);
      const responseData = await requestPerson.json();
      console.log(responseData.cast);
      setCredit(responseData.cast);
    };
    fetchMovies();
  }, [credit]);

  return (
    <main>
      <article className="person_content">
        <div className="left_person">
          {person && (
            <img src={imgUrl + person.profile_path} alt={person.name} />
          )}
        </div>
        <div className="right_person">
          {person && (
            <div key={person.id} className="biography">
              <h3>{person.name}</h3>
              <h5>Biography</h5>
              <p>{person.biography}</p>
            </div>
          )}
        </div>
      </article>




      <div className="cast_information">
        <div className="left_info">
          <div className="person_title">
            <h3>Credit Information</h3>
          </div>
          <div className="name personal">
            <h5>Original Name</h5>
            <p>{person.name}</p>
          </div>
          <div className="gender personal">
            <h5>Gender</h5>
            {person && person.gender === 1 ? <p>Female</p> : <p>Male</p>}
          </div>
          <div className="birthday personal">
            <h5>Birthday</h5>
            <p>{person.birthday}</p>
          </div>
          {person && person.deathday === null ? (
            <div className="hidden"></div>
          ) : (
            <div className="deathday personal">
              <h5>DeathDay</h5>
              <p>{person.deathday}</p>
            </div>
          )}
          <div className="birth_place personal">
            <h5>Birth of Place</h5>
            <p>{person.place_of_birth}</p>
          </div>
        </div>
        <div className="right_info">
          <div className="acting_title"><h3>Known for {person.name} characters</h3></div>

          <div className="acting_content">
            {credit &&
              credit.map((movies) => (
                <Link to = {`/movies/${movies.id}/${movies.original_title}`} className="acting_movies" key={movies.id}>
                  {movies.poster_path === null &&
                  movies.backdrop_path === null ? (
                    <div className="not_availabile">
                      <p>Not Availabile</p>
                    </div>
                  ) : (
                    <div className="acting_movies">
                    <img
                      src={
                        imgUrl +
                        (movies.poster_path || movies.backdrop_path)
                      }
                    />
                     <p>{movies.original_title}</p>
                    </div>
                  )}
           
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Person;
