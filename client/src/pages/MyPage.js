import { useState } from 'react';
import {Link} from 'react-router-dom' 
import PostList from '../components/PostList';
import NFTList from '../components/NFTList';
import '../assets/css/mypage.css'
import Footer from '../components/Footer'

const MyPage = ({user, posts, nfts}) => {
    const [responsibleToggle,SetResponsibleToggle] = useState(false)
    const[postLimit, setPostLimit] = useState(10);
    const[postPage, setPostPage] = useState(1);
    const postOffset = (postPage - 1) * postLimit
    let numPostPages = Math.ceil(posts.length/postLimit)

    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)

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
            <div className='category narrow'>
            <i className="fa-solid fa-caret-down" onClick={()=>{SetResponsibleToggle(!responsibleToggle)}}>
                </i>
                {
                responsibleToggle === false?
                <></>
                :<div className='toggle_category'>
                    <div className='toggle_category_1'>
                        <h2>{user.nickname}</h2>
                        <Link to="/mypage"><h4>My Page</h4></Link>
                        <Link to="/market"><h4>NFT Market</h4></Link>
                        <Link to="/"><h4>ETH Faucet</h4></Link>
                        <Link to="/"><h4>Log Out</h4></Link>
                        <Link to="/"><h4>Secession</h4></Link>
                    </div>
                    <div className='toggle_category_2'>
                        <Link to='/'><h5>Korean</h5></Link>
                        <Link to='/'><h5>Chinese</h5></Link>
                        <Link to='/'><h5>Japanese</h5></Link>
                        <Link to='/'><h5>Western</h5></Link>
                    </div>    
                </div>
                }


            </div>
            <div className='category wide'>
                <Link to='/'><h2>Korean</h2></Link>
                <Link to='/'><h2>Chinese</h2></Link>
                <Link to='/'><h2>Japanese</h2></Link>
                <Link to='/'><h2>Western</h2></Link>
            </div>
            <div className='mypage'>
                <div className='user_info'>
                    <div className='user_info_1'>
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
                </div>
                <div className='user_info_2'>
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
            </div>
            {
                <div className='pagination'>
                <h1 className='my_assets'>My Posts</h1>

                <select 
                    type = 'number'
                    value={postLimit}
                    onChange={({target: {value}})=> setPostLimit(Number(value))}>
                    {/* <option value='5'>5</option> */}
                    <option value='10'>10</option>
                    {/* <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option> */}
                </select>
                <div className='pagination_button'>
                    <button onClick={()=> setPostPage( postPage - 1 )} disabled = {postPage === 1}>
                        <i className='fas fa-up-long'></i>
                    </button>
                    {Array(numPostPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPostPage( i + 1 )}
                        aria-current = {postPage === i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button onClick={()=> setPostPage( postPage + 1 )} disabled = {postPage === numPostPages}>
                    <i className='fas fa-down-long'></i>
                    </button>
                </div>
            </div>
            }
            {  
                <PostList 
                key={posts.id} 
                posts={posts}
                postOffset ={postOffset}
                postLimit={postLimit}                
                />
                
            }
            </div>
            <div className='mypage'>
            {
                <div className='pagination'>
                <h1 className='my_assets'>My NFTs</h1>
                <select 
                    type = 'number'
                    value={nftLimit}
                    onChange={({target: {value}})=> setNftLimit(Number(value))}>
                    {/* <option value='5'>5</option> */}
                    <option value='10'>10</option>
                    {/* <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option> */}
                </select>
                <div className='pagination_button'>

                    <button onClick={()=> setNftPage( nftPage - 1 )} disabled = {nftPage === 1}>
                        <i className='fas fa-up-long'></i>
                    </button>
                        {Array(numNftPages)
                        .fill()
                        .map((_,i) => (
                            <button
                            className='pagination_num'
                            key = {i + 1}
                            onClick={()=>setNftPage( i + 1 )}
                            aria-current = {nftPage !== i + 1 ? "page" : null}
                            >
                            { i + 1 }
                            </button>
                            ))
                        }
                        <button onClick={()=> setNftPage( nftPage + 1 )}      disabled = {nftPage === numNftPages}>
                        <i className='fas fa-down-long'></i>
                        </button>
                    </div>
                </div>
            }
            {  
                <NFTList
            nftLimit={nftLimit}
            nftOffset={nftOffset}
            nfts={nfts}
                />
            }
            </div>
            <Footer/>
        </div>
    );
}
export default MyPage;