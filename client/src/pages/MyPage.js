import { useState, useEffect } from "react";
import {getUser} from '../apis/user'
import {Post} from '../components/Post'
const MyPage = () => {
 const[user, setUser] = useState([])
 useEffect(()=>{
    getUser()
    .then((result)=>{
        console.log(result)
        setUser(result)
        console.log(result)
    })
 },[])
 const userData =[{
    "id": 1,
    "nickname": "Russ",
    "address": "wallet_address",
    "token_balance": "12.02",
    "nfts": "20",
    "posts": "199",
  }
]
    return(
        <div>
            <div className="front_image">
                <img src="https://i.pinimg.com/564x/ca/43/e8/ca43e8863e1abdcee7dc801a24a0d415.jpg" alt="front"></img>
            </div>
            <div className="nickname">{userData[0].nickname}</div>
            <div className="address">{userData[0].address}</div>
            <div className="token_balance">{userData[0].token_balance}ETH</div>
            <div className="posts">{

                }</div>
            <div className="nfts">{userData[0].nfts}</div>

        </div>
    );
}
export default MyPage;