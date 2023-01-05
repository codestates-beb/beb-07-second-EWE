import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
const MainPage = ({posts}) => {

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
                <PostList key={posts.id} posts={posts}/>
            </div>
            <div className='pagination'>
            </div>
            <Footer/>
        </div>
    );
}
export default MainPage;