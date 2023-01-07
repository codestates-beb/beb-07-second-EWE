import '../assets/css/asset.css'
import { Link } from 'react-router-dom'
const Post = ({posts}) => {
    const numCount = (num) =>{
        if(num<=1000){
            return num + ' '
        }
        else if(num>1000){ 
            return Math.floor(num/1000)+ ' K '
        }

        else if(num>10000){ 
            return Math.floor(num/10000) +' M '
        }
    }
    console.log(posts)
    return(
        <Link to={'/post/'+ posts.id }className="asset_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fas fa-utensils '></i>
                    </div>
                    <div className="post_title"><h5>{posts.title}</h5>
                    <div className='location'><h6>{posts.location}</h6></div>
                    </div>
                    <div className="post_num"><h4>#{posts.id}</h4></div>
                </div> 
                <div className='user2'>
                    <div className="nickname"><h6>
                    {posts.user === null? 'null' : posts.user.nickname}
                    </h6>
                    </div>
                    <div className="createdAt" ><h6>{posts.createdAt.slice(0,10)}</h6></div>
                </div>
            </div>
            <div className="image" >
                <img src = {posts.images[0].uri}  alt="food"></img>
            </div>
            <div className='post_bottom'>
                <div className="likes">
                    <i className='fas fas fa-thumbs-up'>{numCount(posts.views)}
                    </i>
                </div>
                <div className="view">
                    <h5>
                    {numCount(posts.views)}
                    view</h5>
                </div>
            </div>
        </Link>
    );
}
export default Post;