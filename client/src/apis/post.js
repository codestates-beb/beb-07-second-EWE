import axios from "axios";

// Test URL
const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";
const getPostsURL = origin + "/posts";
const getPostOneURL = origin + "/posts/"
const createReviewURL = origin + "/posts";
const increaseLikeURL = origin

// Test API Request
export const getPosts = async(offset, limit)=>{
    const requestURL = new URL(getPostsURL);
    const params = requestURL.searchParams;

    if (offset > -1 && limit> 0) {
        params.append("offset", offset);
        params.append("limit", limit);
    }

    const {posts, totalNum} = await axios.get(requestURL.toString())
    .then(res=>res.data)
    .catch(console.log);

    return {posts, totalNum : totalNum.totalNum};
}

export const getPostOne = async (id)=>{
    const requestURL = getPostOneURL + id;
    const post = await axios.get(requestURL)
    .then(res=>{
        if (res.status === 200) return res.data;
    })
    .catch(err=>err.response);

    return post;
}

export const createReview = async(review, accessToken)=>{
    if(!review.user_id || !review.title || !review.location || !review.content || !review.image)
        return new Error("Invalid Review Info!");

    if(!accessToken) return new Error("Not Authorized");

    const createResult = await axios.post(createReviewURL, review, {
        headers:{
            Authorization: `${accessToken}`,
            "Content-Type": "multipart/form-data"
        }
    })
    .then(res=>res)
    .catch(err=>err);

    return createResult;
}

export const increaseLike = async(postId)=>{
    const requestURL = `${origin}/posts/${postId}/likes`;
    const likeResult = await axios.post(requestURL)
    .then(res=>res)
    .catch(err=>err);

    return likeResult;
}