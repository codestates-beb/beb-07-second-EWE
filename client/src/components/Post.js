import '../assets/css/post.css'
const Post = ({posts}) => {
    const viewCount = (views) =>{
        if(views<=1000){
            return views + 'view'
        }
        else if(views>1000){ 
            return Math.floor(views/1000)+ 'K view'
        }

        else if(views>10000){ 
            return Math.floor(views/10000) +'M view'
        }
    }
    return(
        <a href='/postdetail' className="post_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fas fa-user '></i>
                    </div>
                    <div className="post_title"><h6>{posts.title}</h6></div>
                    <div className="post_num">{posts.id}</div>
                </div> 
                <div className='user2'>
                    <div className="creator">{posts.creator}</div>
                    <div className="view">
                        {viewCount(posts.views)}
                    </div>
                    <div className="createdAt" >{posts.created_at.slice(0,10)}</div>
                </div>
            </div>
            <div className="image" >
                <img src = {posts.images}  alt="food"></img>
            </div>

            <div className="comments">
            </div>
        </a>
    );
}
export default Post;