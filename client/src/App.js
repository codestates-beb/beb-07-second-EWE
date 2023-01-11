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
import {localLoginUser, verifyUser} from './apis/user'

const App =()=> {
  const [user, setUser] = useState({nickname: "Guest"});
  const accessToken = useSelector((state)=>state.auth.accessToken);
  const isLogin = useSelector((state)=>state.auth.isLogin);
  
  const dispatch = useDispatch();

  const liftUser = (user)=>{
    setUser(user);
  }

  useEffect(()=>{
    verifyUser()
    .then(result=>{
      setUser(result.data.user);

      dispatch(setAuth({
        accessToken: result.data.accessToken, 
        userID: result.data.user.id
      }));
    })
    .catch(err=>{return;})
  },[])

  return (
    <BrowserRouter>
      <Header user = {user} liftUser={liftUser}/>
      <Routes>
        <Route path='/' element={<MainPage  user = {user}/>}/>
        <Route path='/market' element={<MarketPage
        />}/>
        <Route path='/mypage'  element={<MyPage user = {user}/>}/>
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/write' element={<WritePage user = {user}/>}/>
        <Route path='/post/:postId' element={<PostDetailPage/>}/>
        <Route path='/nft/:nftId' element={<NFTDetailPage/>}/>
        <Route path='/404' element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
