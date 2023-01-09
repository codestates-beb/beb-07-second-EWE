import { Link,useParams } from "react-router-dom";
import { useState, useEffect }  from "react";
import { getNftOne,getNftMetadata } from "../apis/nft";
import "../assets/css/nftdetail.css";

const NFTDetail = () =>{
    const {nftId} = useParams(1)
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState(null);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            setNft(result);
            console.log(nft);
            setMetadata(getNftMetadata(result))
            console.log(metadata);
            // setUser(result.user);
        })();
    }, []);
    // useEffect(()=>{
    //     getNftMetadata(metadata)
    //     .then(metadata=>{
    //         // console.log(metadata)
    //         setMetadata(metadata);
    //         setIsLoading(false);
    //     })
    //     .catch(console.log());
    // }, [])
    // console.log(nft)
    console.log(nft)
    // console.log(user)
    return(
        <div className="nft_detail">
            <div className="nft_image">
                <h1>image</h1>
                {/* <h1>{metadata.image}</h1> */}
            </div>
            <div className="nft_name">
                <h1>name</h1>
                {/* <h1>{metadata.name}</h1> */}
            </div>
            <div className="nft_description">
                <h1>description</h1>
                {/* <h1>{metadata.description}</h1> */}
            </div>
            <div className="nft_attributes">
                <h1>attributes</h1>
                {/* <h1>trait_type{metadata.attributes.trait_type}</h1>
                <h1>value{metadata.attributes.value}</h1> */}
            </div>

        </div>
    )
}

export default NFTDetail;