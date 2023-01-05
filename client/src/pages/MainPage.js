import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
import { useState } from 'react';

const MainPage = ({posts}) => {
    const[postLimit, setPostLimit] = useState(10);
    const[postPage, setPostPage] = useState(1);
    const postOffset = (postPage - 1) * postLimit
    let numPages = Math.ceil(posts.length/postLimit)

    return(
        <div className='main'>
            <a href='/write' className='write'>
                <div className='post_button'>POST</div>
            </a>
            <div className='category'>
            <a href='/'><h2>Korean</h2></a>
            <a href='/'><h2>Western</h2></a>
            <a href='/'><h2>Japanese</h2></a>
            <a href='/'><h2>Chinese</h2></a>
            </div>
            <div className='post_list'>
            <div className='post_head'>
                <h2>Posts</h2>
            </div>
                <PostList 
                key={posts.id} 
                posts={posts}
                postOffset ={postOffset}
                postLimit={postLimit}                
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
                <button onClick={()=> setPostPage( postPage - 1 )} disabled = {postPage === 1}>
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
                    <button onClick={()=> setPostPage( postPage + 1 )} disabled = {postPage === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>


            </div>

            <Footer/>
        </div>
    );
}
export default MainPage;