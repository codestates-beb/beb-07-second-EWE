import axios from "axios";

// Test URL
const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";
const getNftsURL = origin + "/nfts";
const getNftsByUserURL = origin + "/users";
const getNftOneURL = origin + "/nfts/"
const mintNFTURL = origin + "/nfts";

// Test API Request
export const getNfts = async(offset, limit)=>{
    const requestURL = new URL(getNftsURL)
    const params = requestURL.searchParams;

    if (offset > -1 && limit > 0) {
        params.append("offset", offset);
        params.append("limit", limit);
    }

    const {nfts, totalNum} = await axios.get(requestURL.toString())
    .then(res=>res.data)
    .catch(console.log);

    return {nfts, totalNum: totalNum.totalNum};
}

export const getNftsByUser = async(offset, limit, userId)=>{
    const requestURL = new URL(`${getNftsByUserURL}/${userId}/nfts`);
    const params = requestURL.searchParams;

    if (offset > -1 && limit > 0) {
        params.append("offset", offset);
        params.append("limit", limit);
    }

    const {nfts, totalNum} = await axios.get(requestURL.toString())
    .then(res=>res.data)
    .catch(console.log);

    return {nfts, totalNum: totalNum.totalNum};
}

export const getNftOne = async (id)=>{
    const requestURL = getNftOneURL + id;
    const nft = await axios.get(requestURL)
    .then(res=>{
        if (res.status === 200) return res.data
    })
    .catch(err=>err.response);
    return nft
}

export const getNftMetadata = async (getNftMetadataURL)=>{
    const metadata = await axios.get(getNftMetadataURL, {
        responseType: "json"
    })
    
    .then(res=>res.data)
    .catch(err=>err.response);
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