import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getPostsURL = origin + "/test/posts";
const getPostOneURL = origin + "/test/posts/"
const getPostsURLv2 = origin + "/testv2/posts";
const getPostOneURLv2 = origin + "/testv2/posts/"

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

export const getPostsv2 = async()=>{
    const posts = await axios.get(getPostsURLv2)
    .then(res=>res.data)
    .catch(console.log);
    return posts;
}

export const getPostOnev2 = async()=>{
    const requestURL = getPostOneURLv2 + id;
    const posts = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);
    return posts;
}