import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Categories, Popular, Series, Streaming, Trending, Upcoming } from './sections';
import Nav from "./sections/Nav";
import Home from './sections/Home';
import "./main.css";
const App = () => {
  return (
    <BrowserRouter>
          <Nav>
              <Routes>
                 <Route path="/" element = {<Home />}/>
              </Routes>
          </Nav>
    </BrowserRouter>
  )
}

export default App