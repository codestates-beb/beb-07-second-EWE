import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getNftsURL = origin + "/nfts";
const getNftOneURL = origin + "/nfts/"
const getNftsURLv2 = origin + "/testv2/nfts";
const getNftOneURLv2 = origin + "/testv2/nfts/"

const mintNFTURL = origin + "/nfts";

// Test API Request
export const getNfts = async()=>{
    const nfts = await axios.get(getNftsURL)
    .then(res=>res.data)
    .catch(console.log);
    return nfts;
}

export const getNftOne = async (id)=>{
    const requestURL = getNftOneURL + id;
    const nft = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);

    return nft
}

export const getNftsv2 = async()=>{
    const nfts = await axios.get(getNftsURLv2)
    .then(res=>res.data)
    .catch(console.log);
    
    return nfts;
}

export const getNftOnev2 = async(id)=>{
    const requestURL = getNftOneURLv2 + id;
    const nfts = await axios.get(requestURL)
    .then(res=>res.data)
    .catch(console.log);
    return nfts;
}

export const getNftMetadata = async (getNftMetadataURL)=>{
    const metadata = await axios.get(getNftMetadataURL, {
        responseType: "json"
    })
    .then(res=>res.data)
    .catch(console.log);

    return metadata
}

export const mintNFT = async(metadata, accessToken)=>{
    if(metadata) return new Error("Invalid NFT data!");
    
    const mintResult = await axios.post(mintNFTURL, metadata, {
        headers: {
            Authorization: accessToken
        }
    })
    .then(result=>result)
    .catch(console.log);

    return mintResult;
}