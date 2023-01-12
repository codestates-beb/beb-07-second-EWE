import axios from "axios";

const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";

const transferTokenURL = origin + "/token/transfer";

export const transferToken = async(address, amount)=>{
    if (!address || !amount|| amount<0) return new Error("Invalid Input");

    const receit = await axios.post(transferTokenURL, {address, amount: new Number(amount)})
    .then(res=>res.data)
    .error(console.log);

    if(receit.status === "ok") return true;
    else return false;
}