// modules
import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { useState, useEffect } from 'react'

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
import {getUser, getUserv2} from './apis/user'
import {getPosts, getPostsv2} from './apis/post'

const App =()=> {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState([])

  useEffect(()=>{
    getPostsv2()
      .then((result)=>{
          setPosts(result)

      })
  },[])

  const userId = 2;
  useEffect(()=>{
      getUser(userId)
      .then((result)=>{
          setUser(result)
      })
  },[])
  return (
    <BrowserRouter>
      <Header user = {user}/>
      <Routes>
        <Route path='/' element={<MainPage posts={posts}/>}/>
        <Route path='/market' element={<MarketPage/>}/>
        <Route path='/mypage'  element={<MyPage 
        posts={posts} user = {user}/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/write' element={<WritePage user = {user}/>}/>
        <Route path='/postdetail' element={<PostDetailPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;