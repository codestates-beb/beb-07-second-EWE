import { useState } from 'react';
import Post from '../components/Post'
import '../assets/css/mypage.css'
import Footer from '../components/Footer'
const MyPage = ({user, posts}) => {
    const [isFiltered, setIsFiltered] = useState('')
    const [filteredPost, setFilteredPost] = useState([])
    const handleFilterPost=(e)=>{
        if(e.target.value === ''){
            setIsFiltered(false)
        }else{
            const filtered = posts.filter(
                (post)=>post.creator===user.nickname
            ) 
            setIsFiltered(true)
            setFilteredPost(filtered)
        }
    }
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
        }
    };

    return(
        <div>
                    <a href='/write' className='write'>
                <div className='post_button'>POST</div>
            </a>
            <div className='mypage'>
            <div className='user_info'>
            <h2>User Information</h2>
                <div className="nickname">
                    <h3>Nickname</h3>
                    {user.nickname}
                </div>
                <div className="email">
                    <h3>Email</h3>
                    {user.email}
                </div>
                <div className="wallet_account">
                    <h3>Wallet Account</h3>
                    <div className='account'>
                        <p>{user.wallet_account}</p>
                        <button onClick={() => {handleCopyClipBoard(user.wallet_account)}}>copy</button>
                    </div>
                </div>
                <div className="eth">
                    <h3>Balance</h3>
                    {user.eth}ETH
                </div>
                <div className="erc20">
                    <h3>Token</h3>
                    {user.erc20}
                </div>
                <div className='token_transfer'>
                    <h2>Token Transfer</h2>
                    <div className="receivers_address">
                        <h4>Receiver's Address</h4>
                        <input></input>
                    </div>
                    <div className="amount">
                        <h4>Amount</h4>
                        <input></input>
                    </div>
                    <div className='transaction'>
                        <h2>Transaction</h2>
                    </div>
                </div>
            </div>
            <div className='post_wrapper'>
            <h1 className='my_assets'>My NFTs</h1>
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }</div>
            
            </div>
            <div className='mypage'>
            <div className='post_wrapper'>
            <h1 className='my_assets'>My Posts</h1>
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }</div>
            </div>
            <Footer/>
        </div>
    );
}
export default MyPage;