import axios from "axios";

// Test URL
const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";
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
    if(!metadata.image || !metadata.name || !metadata.description || !metadata.attributes) return new Error("Invalid NFT data!");
    console.log(metadata);
    const mintResult = await axios.post(mintNFTURL, metadata, {
        headers: {
            Authorization: `${accessToken}`,
            "Content-Type": "multipart/form-data",
        }
    })
    .then(result=>result)
    .catch(console.log);

    return mintResult;
}