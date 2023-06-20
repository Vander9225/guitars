import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GuitarList from "./components/guitarList/GuitarList";
import SingleGuitar from "./components/singleGuitar/SingleGuitar";
import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';

import './App.css';
import MainPage from "./components/mainPage/MainPage";


const App = () => {

  return (
    <Router>
      <div className="App">
        <AppHeader/>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/:category" element={<GuitarList/>}/>
          <Route path="/:category/:guitarId" element={<SingleGuitar/>}/>
        </Routes>
        <AppFooter/>
      </div>
    </Router>
  );
}

export default App;
