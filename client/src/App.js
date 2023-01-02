// modules
import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom"

// css
import './App.css';

// components
import Header from './components/Header';

// pages
import MainPage from './pages/MainPage';
import MarketPage from './pages/MarketPage';
import MyPage from './pages/MyPage';
import SignupPage from './pages/SignupPage';
import WritePage from './pages/WritePage';
import PostDetailPage from './pages/PostDetailPage';


const App =()=> {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/market' element={<MarketPage/>}/>
        <Route path='/mypage' element={<MyPage/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/write' element={<WritePage/>}/>
        <Route path='/postdetail' element={<PostDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
