import Post from './Post'
const PostList = ({posts,offset,limit }) => {

    return(
        <div className='post_wrapper'>
            {  
                posts.slice(offset, offset + limit).map((posts)=>{
                    return (<Post key={posts.id} posts={posts}/>)
                })
            }

        </div>
    );
}
export default PostList;