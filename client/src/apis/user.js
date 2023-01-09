import axios from "axios";

const localStorage = window.localStorage;

// Test URL
const origin = "http://20.214.190.113:5050";
const getUserURL = origin + "/users/";

const getUserURLv2 = origin + "/testv2/users";

const signupUserURL = origin + "/users/join"
const loginURL = origin + "/users/login";
const verifyUserURL = origin + "/users/newAccessToken";

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

export const loginUser = async(userInfo)=>{
    if(!userInfo.email || !userInfo.password) return new Error("invalid info");

    const loginResult = await axios.post(loginURL, userInfo, {withCredentials:true})
    .then(result=>result.data)
    .catch(console.log);

    return loginResult;
}

export const verifyUser = async()=>{
    const verifyResult = await axios.get(verifyUserURL, {
        withCredentials:true,
    })
    .then(result=>result.data)
    .catch(console.log);

    return verifyResult;
}

export const signupUser = async(userInfo)=>{
    if(!userInfo.email || !userInfo.password || !userInfo.nickname)
        return new Error("Invalid User Info!");

    const resultSignup = await axios.post(signupUserURL, userInfo)
    .then(result=>result)
    .then(err=>err)

    return resultSignup;
}

