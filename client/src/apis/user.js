import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getUserURL = origin + "/test/users/";

const getUserURLv2 = origin + "/testv2/users";

// Test API Request
export const getUser = async(userId)=>{
    const requestURL = getUserURL + userId

    const user = await axios.get(requestURL)
    .then(res=>res.data.result)
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


