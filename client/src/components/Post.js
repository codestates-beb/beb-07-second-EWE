import '../assets/css/asset.css'
import '../assets/image/loading.gif'
import { Link } from 'react-router-dom'
const Post = ({post, isLoading}) => {
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
                    <div className="post_title"><h5>{post.title === undefined ||post.title === null ?<></>:post.title.length>13?post.title.slice(0,11)+'...':post.title}</h5>
                    <div className='location'><h6>{post.store_name === undefined ||post.store_name === null ?<></>:post.store_name}</h6></div>
                    </div>
                    <div className="post_num"><h4>#{post.id === undefined ||post.id === null ?<></>:post.id}</h4></div>
                </div> 
                <div className='user2'>
                    <div className="nickname"><h6>
                    {post.user.nickname === undefined ||post.user.nickname === null ? 'null' : post.user.nickname}
                    </h6>
                    </div>
                    <div className="createdAt" ><h6>{post.createdAt === undefined ||post.createdAt === null ?<></>:
                        post.createdAt.slice(0,10)}</h6></div>
                </div>
            </div>
            <div className="image" >
                <img src = {
                    isLoading?require('../assets/image/loading.gif'): post.images === undefined ||post.images === null 
                    ?require('../assets/image/unnamed.png'):post.images[0].uri}  alt="food"></img>
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