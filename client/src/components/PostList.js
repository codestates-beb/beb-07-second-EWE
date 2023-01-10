import Post from './Post'
const PostList = ({posts,postOffset,postLimit,user }) => {

    return(
        <div className='post_wrapper'>
            {  
                posts.slice(postOffset, postOffset + postLimit).map((post)=>{
                    return (<Post key={post.id} post={post} user={user}/>)
                })
            }
        </div>
    );
}
export default PostList;