import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getUserURL = origin + "/test/users/";

const getUserURLv2 = origin + "/testv2/users";

const signupUserURL = origin + "/users/join"

// Test API Request
export const getUser = async(userId)=>{
    const requestURL = getUserURL + userId

    const user = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return user;
}

export const getUserv2 = async(userId)=>{
    const requestURL = getUserURLv2 + userId

    const user = await axios.get(requestURL)
    .then(res=>res.data.result)
    .catch(console.log);

    return user;
}

export const signupUser = async(userInfo)=>{
    if(!userInfo.email || !!userInfo.password || !userInfo.nickname) return;

    const resultSignup = await axios.post(signupUserURL, userInfo)
    .then(result=>result)
    .then(err=>err)

    return resultSignup;
}


