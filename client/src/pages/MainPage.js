import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList';
const MainPage = () => {
    return(
        <div>
            <a href='/writepage' className='write'>
                <div className='post_button'>POST</div>
                
            </a>
            <div className='category'></div>
            <div className='post_list'>
                <PostList/>
            </div>
            <Footer/>
        </div>
    );
}
export default MainPage;