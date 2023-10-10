import React, {useEffect} from 'react'
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { Categories, Popular, Series, Streaming, Trending, Upcoming, Results } from './sections';
import Nav from "./sections/Nav";
import Home from './sections/Home';
import Detail from "./movieDetail/Detail";
import SeriesDetail from "./seriesDetail/SeriesDetail";
import SeriesRecommend from './recommend/SeriesRecommend';
import MovieRecommend from './recommend/MovieRecommend';
import Person from "./person/Person";
import "./main.css";
import Horror from './components/Horror';
import Action from './components/Action';
import Biography from './components/Biography';
import Romance from "./components/Romance";
import Science from './components/Science';
import Explore from './components/Explore';
import Trends from './components/Trends';
import Latests from './components/Latests';
import Streams from './components/Streams';
import Upcoms from './components/Upcoms';
import Movies from './primary/Movies';
import Pages from "./primary/Pages";
const App = () => {

  document.title = "Chill With Huru's";
  return (
    <BrowserRouter>
          <Nav>
              <Routes>
                 <Route path="/" element = {<Home />}/>
                 <Route path="/movies/:id/:name" element = {<Detail />}/>
                 <Route path="/series/:id/:name" element = {<SeriesDetail />}/>
                 <Route path="/search/:name" element = {<Results />}/>
                 <Route path="/tv-shows/recommendation/:id/:name" element = {<SeriesRecommend/>}/>
                 <Route path="/entertainment/recommendation/:id/:name" element = {<MovieRecommend/>}/>
                 <Route path="/credit/:id/:name" element = {<Person />}/>
                 <Route path="/categories/:id/:name" element = {<Horror />}/>
                 <Route path="/categories/:id/:name" element = {<Action />}/>
                 <Route path="/categories/:id/:name" element = {<Biography />}/>
                 <Route path="/categories/:id/:name" element = {<Romance />}/>
                 <Route path="/categories/:id/:name" element = {<Science />}/>
                 <Route path="/categories" element = {<Explore />}/>
                 <Route path="/trending" element = {<Trends />}/>
                 <Route path="/latest" element = {<Latests />}/>
                 <Route path="/streaming" element = {<Streams />}/>
                 <Route path="/upcoming" element = {<Upcoms />}/>
                 <Route path="/huru/best-selection-movies/watch" element = {<Movies />}/>
                 <Route path="/huru/best-selection-movies/watch/pages/:id" element = {<Pages />}/>
              </Routes>
          </Nav>
    </BrowserRouter>
  )
}

export default App