import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
import { useState } from 'react';

const MainPage = ({posts}) => {
    const[limit, setLimit] = useState(10);
    const[page, setPage] = useState(1);
    const offset = (page - 1) * limit
    let numPages = Math.ceil(posts.length/limit)

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
                <PostList 
                key={posts.id} 
                posts={posts}
                offset ={offset}
                limit={limit}                
                />
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
                    <button onClick={()=> setPage( page + 1 )} disabled = {page === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>


            </div>

            <Footer/>
        </div>
    );
}
export default MainPage;