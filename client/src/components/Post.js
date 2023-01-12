import '../assets/css/asset.css'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import '../assets/image/loading.gif'
const Post = ({post}) => {
    // const [isLoading, setIsLoading] = useState(true)

    const numCount = (num) =>{
        if(num<=1000){
            return ' ' + num + ' '
        }
        else if(num>1000){ 
            return ' ' + Math.floor(num/1000)+ ' K '
        }

        else if(num>10000){ 
            return ' ' + Math.floor(num/10000) +' M '
        }
    }
    return(
        <Link to={'/post/'+ post.id } className="asset_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fas fa-utensils '></i>
                    </div>
                    <div className="post_title"><h5>{post.title}</h5>
                    <div className='location'><h6>{post.location}</h6></div>
                    </div>
                    <div className="post_num"><h4>#{post.id}</h4></div>
                </div> 
                <div className='user2'>
                    <div className="nickname"><h6>
                    {post.user === null? 'null' : post.user.nickname}
                    </h6>
                    </div>
                    <div className="createdAt" ><h6>{post.createdAt.slice(0,10)}</h6></div>
                </div>
            </div>
            <div className="image" >
                <img src = {
                    // isLoading? '../assets/image/loading.gif':
                    post.images.length === 0 ?require('../assets/image/unnamed.png'):post.images[0].uri}  alt="food"></img>
            </div>
            <div className='post_bottom'>
                <div className="likes">
                    <i className='fas fas fa-thumbs-up'>{numCount(post.likes)}
                    </i>
                </div>
                <div className="view">
                    <h5>
                    {numCount(post.views)}
                    view</h5>
                </div>
            </div>
        </Link>
    );
}
export default Post;