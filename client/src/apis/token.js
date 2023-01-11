import axios from "axios";

const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";

const transferTokenURL = origin + "/token/transfer";

export const transferToken = async(address, amount, accessToken)=>{
    if (!address || !amount) return new Error("Invalid Input");

    const receipt = await axios.post(transferTokenURL, {address, amount}, {
        headers:{
            Authorization: accessToken
        }
    })
    .then(res=>res.data)
    .catch(console.log);

    if(receipt.status === "ok") return true;
    else return false;
}