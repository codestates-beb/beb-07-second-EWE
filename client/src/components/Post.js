import '../assets/css/post.css'
import Chicken from '../assets/image/chicken.jpeg'
const Post = () => {
    return(
        <a href='/' className="post_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fas fa-user '></i>
                    </div>
                    <div className="post_title">제목</div>
                    <div className="post_num">100</div>
                </div> 
                <div className='user2'>
                    <div className="creator">user1</div>
                    <div className="view">
                    <i className='fas fa-eye'></i>
                    123123
                    </div>
                    <div className="createdAt">2023-01-03</div>
                </div>
            </div>
            <div className="image">
                <img src = {Chicken} alt="chicken"></img>
            </div>

            <div className="comments">
            </div>
        </a>
    );
}
export default Post;