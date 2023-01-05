import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
import { useState, useEffect } from 'react'
const MainPage = ({posts}) => {
    const[limit, setLimit] = useState(10);
    const[page, setPage] = useState(1);
    const offset = (page - 1) * limit
    //페이지 길이를 10으로 나누어 올림하여 페이지 개수를 추가
    //최대 10개 까지 출력하며 이후는 출력하지 않음
    //단위 값

    return(
        <div>
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
                offset = {offset}
                limit = {limit}    
                />

                <div className='pagination'>
                <select 
                    type = 'number'
                    value={limit}
                    onChange={({target: {value}})=> setLimit(Number(value))}>
                    <option value='10'>10</option>
                    <option value='30'>30</option>
                    <option value='50'>50</option>
                    <option value='80'>80</option>
                    <option value='100'>100</option>
                    <button></button>
                </select>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                    <div><i className='fas fa-circle'></i></div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}
export default MainPage;