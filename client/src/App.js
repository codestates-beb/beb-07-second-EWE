// modules
import React from 'react';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import { useState, useEffect } from 'react'
import { useSelector, useDispatch} from 'react-redux';

// redux actions
import {
  setAuth,
  resetAuth,
} from "./feature/authSlice";

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
  const [nfts, setNfts] = useState([])
  const [user, setUser] = useState(null);

  const accessToken = useSelector((state)=>state.auth.accessToken);
  const isLogin = useSelector((state)=>state.auth.isLogin);
  
  const dispatch = useDispatch();

  const loginFunc = async(email, password)=>{
    try{
      const result = await loginUser({email, password})

      setUser(result.data.user);
      dispatch(setAuth({accessToken: result.data.accessToken}));
    } catch{
      console.log("login failed");
    }
  }

  useEffect(()=>{
    verifyUser()
    .then(result=>{
      setUser(result.data.user);
      dispatch(setAuth({accessToken: result.data.accessToken}));
    })
    .catch(err=>{return;})

    getPosts()
      .then((result)=>{
          setPosts(result)
      })

    getNfts()
    .then((result)=>{
        setNfts(result)
    })
  },[])

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