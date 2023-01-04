import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getPostsURL = origin + "/test/posts";
const getPostOneURL = origin + "/test/posts/"

// Test API Request
export const getPosts = async()=>{
    const posts = await axios.get(getPostsURL)
    .then(res=>res.data)
    .catch(console.log);
    return posts;
}

export const getPostOne = async (id)=>{
    const requestURL = getPostOneURL + id;
    const post = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);
    return post
}