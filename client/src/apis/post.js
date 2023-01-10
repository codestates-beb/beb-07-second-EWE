import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getPostsURL = origin + "/test/posts";
const getPostOneURL = origin + "/test/posts/"

const getPostsURLv2 = origin + "/testv2/posts";
const getPostOneURLv2 = origin + "/testv2/posts/"

const postReviewURL = origin + "/posts";

// Test API Request
export const getPosts = async()=>{
    const posts = await axios.get(getPostsURL)
    .then(res=>res.data.result)
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

export const getPostOnev2 = async(id)=>{
    const requestURL = getPostOneURLv2 + id;
    const post = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);
    
    return post;
}

export const createReview = async(review, accessToken)=>{
    if(!review.user_id || !review.title || !review.location || !review.content)
        return new Error("Invalid Review Info!");

    if(!accessToken) return new Error("Not Authorized");

    const createResult = await axios.post(postReviewURL, review, {
        headers:{
            Authorization: accessToken
        }
    })
    .then(res=>res)
    .catch(err=>err);

    return createResult;
}