// modules
import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';

// redux actions
import {
  setUser,
  resetUser,
} from "./feature/userSlice";

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
import NFTDetailPage from './pages/NFTDetailPage';
import NotFoundPage from './pages/NotFoundPage';

// apis
import {loginUser, verifyUser} from './apis/user'
import {getPosts} from './apis/post'
import {getNfts} from './apis/nft'

const App =()=> {
  const [posts, setPosts] = useState([])
  const [user, setUser] = useState(null);
  // const user = useSelector((state)=>state.user);
  const [nfts, setNfts] = useState([])
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  
  const dispatch = useDispatch();

  const loginFunc = async(email, password)=>{
    try{
      const result = await loginUser({email, password})

      setUser(result.data.user);
      setIsLogin(true);
    } catch{
      console.log("login failed");
    }

  }

  useEffect(()=>{
    try{
      verifyUser()
      .then(result=>{
        setUser(result.data.user);
        setIsLogin(true);
        setAccessToken(result.data.accessToken);
      })
    } catch{}

    getPosts()
      .then((result)=>{
          setPosts(result)
      })
  },[])

  useEffect(()=>{
    getNfts()
      .then((result)=>{
          setNfts(result)
      })
  },[])

  useEffect(()=>{
    console.log(user);
  },[user])

  return (
    <BrowserRouter>
      <Header user = {user} isLogin={isLogin} loginFunc={loginFunc}/>
      <Routes>
        <Route path='/' element={<MainPage  user = {user} posts={posts}/>}/>
        <Route path='/market' element={<MarketPage
          nfts={nfts}
        />}/>
        <Route path='/mypage'  element={<MyPage 
        posts={posts} nfts={nfts} user = {user}/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/write' element={<WritePage user = {user}/>}/>
        <Route path='/post/:postId' element={<PostDetailPage/>}/>
        <Route path='/nfts/:nftId' element={<NFTDetailPage/>}/>
        <Route path='/404' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;