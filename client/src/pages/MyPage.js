import { useState } from 'react';
import PostList from '../components/PostList';
import NFTList from '../components/NFTList';
import '../assets/css/mypage.css'
import Footer from '../components/Footer'
const MyPage = ({user, posts, nfts}) => {

    const[limit, setLimit] = useState(10);
    const[page, setPage] = useState(1);
    const offset = (page - 1) * limit
    let numPages = Math.ceil(posts.length/limit)
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
            {
                <div className='pagination'>
                <h1 className='my_assets'>My NFTs</h1>

                <select 
                    type = 'number'
                    value={limit}
                    onChange={({target: {value}})=> setLimit(Number(value))}>
                    {/* <option value='5'>5</option> */}
                    <option value='10'>10</option>
                    {/* <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option> */}
                </select>
                <button onClick={()=> setPage( page - 1 )} disabled = {page === 1}>
                    <i className='fas fa-up-long'></i>
                </button>
                    {Array(numPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPage( i + 1 )}
                        aria-current = {page === i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button onClick={()=> setPage( page + 1 )} disabled = {page === numPages}>
                    <i className='fas fa-down-long'></i>
                    </button>
                </div>

            }
            {  
                <PostList 
                key={posts.id} 
                posts={posts}
                offset ={offset}
                limit={limit}                
                />
                
            }
            </div>
            <div className='mypage'>
            {
                <div className='pagination'>
                <select 
                    type = 'number'
                    value={limit}
                    onChange={({target: {value}})=> setLimit(Number(value))}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option>
                </select>
                <button onClick={()=> setPage( page - 1 )} disabled = {page === 1}>
                    <i className='fas fa-left-long'></i>
                </button>
                    {Array(numPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPage( i + 1 )}
                        aria-current = {page !== i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button onClick={()=> setPage( page + 1 )}      disabled = {page === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>

            }
            {  
                <NFTList
            limit={limit}
            offset={offset}
            nfts={nfts}
                />
            }
            </div>
            <Footer/>
        </div>
    );
}
export default MyPage;