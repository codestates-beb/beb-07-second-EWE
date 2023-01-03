import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getUserURL = origin + "/test/users/";

// Test API Request
export const getUser = async(userId)=>{
    const requestURL = getUserURL + userId

    const user = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return user;
}



