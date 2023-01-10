import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
import {postPagination} from '../apis/post'
import { useState } from 'react';
import { Link } from 'react-router-dom';
const MainPage = ({posts, user}) => {
    const[postLimit, setPostLimit] = useState(10);
    const[postPage, setPostPage] = useState(1);
    const [responsibleToggle,SetResponsibleToggle] = useState(false)
    const postOffset = (postPage - 1) * postLimit
    let numPages = Math.ceil(posts.length/postLimit)
    return(
        <div className='main'>
            <Link to='/write' className='write'>
                <img className='post_button' src={require('../assets/image/post_1.png')}>
                    
                {/* <div className='post_button_head'>What you got, Where you like, Whatever you eat</div>
                <div className='post_button_body'>POST</div>
                <div className='post_button_footer'>Incentive Programs for Community Engagement</div> */}
                </img>
            </Link>
            <div className='category narrow'>
            <i className="fa-solid fa-caret-down" onClick={()=>{SetResponsibleToggle(!responsibleToggle)}}>
                </i>
                {
                responsibleToggle === false?
                <></>
                :<div className='toggle_category'>
                    <div className='toggle_category_1'>
                        <h2>{user.nickname}'s Dishes</h2>
                        <Link to="/mypage">My Page</Link>
                        <Link to="/market">NFT Market</Link>
                        <Link to="/">ETH Faucet</Link>
                        <Link to="/">Log Out</Link>
                        <Link to="/">Secession</Link>
                    </div>
                </div>
                }


            </div>
            <div className='category wide'>
                <Link to='/'>
                {/* <h2>EWE</h2> */}
                Eat Write Earn   Incentive Community : Get your token with Boasting your dishes!. 
                
                
                </Link>
            </div>
            <div className='post_list'>
            <div className='post_head'>
                <h2>Popular Dishes</h2>
            </div>
                <PostList 
                key={posts.id} 
                posts={posts}
                postOffset ={postOffset}
                postLimit={postLimit}   
                user={user}             
                />
                <div className='pagination'>
                <select 
                    type = 'number'
                    value={postLimit}
                    onChange={({target: {value}})=> setPostLimit(Number(value))}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option>
                </select>
                <button className='pagination_num' onClick={()=> setPostPage( postPage - 1 )} disabled = {postPage === 1}>
                    <i className='fas fa-left-long'></i>
                </button>
                    {Array(numPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPostPage( i + 1 )}
                        aria-current = {postPage !== i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button className='pagination_num' onClick={()=> setPostPage( postPage + 1 )} disabled = {postPage === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>


            </div>

            <Footer/>
        </div>
    );
}
export default MainPage;