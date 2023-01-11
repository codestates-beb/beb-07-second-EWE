import Post from './Post'
const PostList = ({posts,user}) => {
    // console.log(posts)

    return(
        <div className='post_wrapper'>
            {  posts===null?<></>:
                posts.map((post)=>{
                    return (<Post key={post.id} post={post} user={user}/>)
                })
            }
        </div>
    );
}
export default PostList;