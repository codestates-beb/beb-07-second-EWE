import '../assets/css/post.css'
const Post = ({posts}) => {
    return(
        <a href='/' className="post_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fas fa-user '></i>
                    </div>
                    <div className="post_title"key={posts.id}>{posts.title}</div>
                    <div className="post_num"key={posts.id}>{posts.id}</div>
                </div> 
                <div className='user2'>
                    <div className="creator"key={posts.id}>{posts.creator}</div>
                    <div className="view"key={posts.id}>
                        views{posts.views}
                    </div>
                    <div className="createdAt" key={posts.id}>{posts.created_at}</div>
                </div>
            </div>
            <div className="image" key={posts.id}>
                <img src = {posts.images} key={posts.id} alt="food"></img>
            </div>

            <div className="comments">
            </div>
        </a>
    );
}
export default Post;