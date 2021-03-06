import React from 'react';
import { BrowserRouter, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Header from './component/Header';
import Home from './Routes/Home';
import Search from './Routes/Search';
import Tv from './Routes/Tv';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/tv/:tvId" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/search/:searchId" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
