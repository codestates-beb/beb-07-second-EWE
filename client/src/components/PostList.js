import Post from './Post'
const PostList = ({posts}) => {
    console.log(posts)
    return(
        <div className='post_wrapper'>
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }
            {  
                posts.map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }
        </div>
    );
}
export default PostList;