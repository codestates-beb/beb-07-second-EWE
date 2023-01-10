// modules
import { useParams } from "react-router-dom";
import { useState, useEffect }  from "react";
// apis
import { getNfts , getNftOne,getNftMetadata } from "../apis/nft";
import "../assets/css/nftdetail.css";

const NFTDetail = () =>{
    const {nftId} = useParams()
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState(null);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            console.log(result);
            setNft(result);
            const metadata = await getNftMetadata(result.metadata)
            console.log(metadata);
            setMetadata(metadata)
        })();
    }, []);


    useEffect(()=>{
        // console.log(nft);
    }, [nft])

    useEffect(()=>{
        // console.log(metadata);
    }, [metadata])



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
    // console.log(user)
    return(
        <div className="nft_detail">
            <div className="nft_image">
                <h4>image</h4>
                <img src={metadata.image}/>
            </div>
            <div className="nft_name">
                <h4>name</h4>
                <h1>{metadata.name}</h1>
            </div>
            <div className="nft_description">
                <h4>description</h4>
                <h5>{metadata.description}</h5>
            </div>
            <div className="nft_attributes">
                <h4>attributes</h4>
                <h4>trait_type<h1>{metadata.attributes.trait_type}</h1></h4>
                <h4>value<h1>{metadata.attributes.value}</h1></h4>
            </div>

        </div>
    )
}

export default NFTDetail;