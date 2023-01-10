import axios from "axios";

// Test URL
const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";
const getUserOneURL = origin + "/users/";

const localSignupUserURL = origin + "/users/join"
const naverLoginURL = origin + "/naver/login"
const localLoginURL = origin + "/users/login";
const logoutURL = origin + "/users/logout"
const verifyUserURL = origin + "/users/newAccessToken";

// Test API Request
export const getUser = async(userId)=>{
    const requestURL = getUserOneURL + userId

    const user = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return user;
}

export const localLoginUser = async(userInfo)=>{
    if(!userInfo.email || !userInfo.password) return new Error("invalid info");

    const loginResult = await axios.post(localLoginURL, userInfo, {withCredentials:true})
    .then(result=>result.data)
    .catch(console.log);

    return loginResult;
}

export const naverLoginUser = async()=>{
    const loginResult = await axios.get(naverLoginURL, {withCredentials:true})
    .then(result=>result)
    .catch(console.log);

    return loginResult;
}

export const logoutUser = async(accessToken)=>{
    if(!accessToken) return new Error("invalid request");

    const logoutResult = await axios.get(logoutURL, {withCredentials:true})
    .then(result=>result.data)
    .catch(console.log)

    console.log(logoutResult);
    return logoutResult;
}

export const verifyUser = async()=>{
    const verifyResult = await axios.get(verifyUserURL, {
        withCredentials:true,
    })
    .then(result=>result.data)

    return verifyResult;
}

export const localSignupUser = async(userInfo)=>{
    if(!userInfo.email || !userInfo.password || !userInfo.nickname)
        return new Error("Invalid User Info!");

    const resultSignup = await axios.post(localSignupUserURL, userInfo)
    .then(result=>result)
    .then(err=>err)

    return resultSignup;
}


