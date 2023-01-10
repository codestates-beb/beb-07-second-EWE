import axios from "axios";

// Test URL
const origin = "http://20.214.190.113:5050";
const getNftsURL = origin + "/nfts";
const getNftOneURL = origin + "/nfts/"
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

export const getNftMetadata = async (getNftMetadataURL)=>{
    const metadata = await axios.get(getNftMetadataURL, {
        responseType: "json"
    })
    .then(res=>res.data)
    .catch(console.log);

    return metadata
}

export const mintNFT = async(metadata, accessToken)=>{
    if(!metadata.image || !metadata.name || !metadata.description || !metadata.category) return new Error("Invalid NFT data!");
    
    const mintResult = await axios.post(mintNFTURL, metadata, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: accessToken
        }
    })
    .then(result=>result)
    .catch(console.log);

    return mintResult;
}