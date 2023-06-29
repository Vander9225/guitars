import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AppProvider } from './components/AppContext';
import GuitarList from './components/guitarList/GuitarList';
import SingleGuitar from './components/singleGuitar/SingleGuitar';
import AppHeader from './components/appHeader/AppHeader';
import AppFooter from './components/appFooter/AppFooter';
import './App.css';
import MainPage from './components/mainPage/MainPage';
import Register from './components/auth/Register';
import SignPage from './components/auth/SignPage';

const App = () => (
  <AppProvider>
    <Router>
      <div className="App">
        <AppHeader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign" element={<SignPage />} />
          <Route path="/:category" element={<GuitarList />} />
          <Route path="/:category/:guitarId" element={<SingleGuitar />} />
        </Routes>
        <AppFooter />
      </div>
    </Router>
  </AppProvider>
);

export default App;
