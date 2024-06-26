import './App.css';
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Login/SignUp";
import Home from "./pages/Home/Home";
import Header from './components/Header/Header';
import NavBar from './components/Nav/NavBar';
import Profile from './pages/Profile/Profile'; 
import TalkingCircle from './pages/TalkingCircle/TalkingCircle';
import { useGoogleLogin } from '@react-oauth/google';



function App(props) {

  return (
      <BrowserRouter>
        <div className="app-wrapper">
          <Header />
          <NavBar />
          <div className="app-wrapper-content">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/signin" element={<SignIn />}/>
              <Route path="/signup" element={<SignUp store={props.store} />}/>
              <Route path="/profile" element={<Profile />}/>
              <Route path="/talking-circle" element={<TalkingCircle />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;
