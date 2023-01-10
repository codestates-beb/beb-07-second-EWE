// modules
import { useParams } from "react-router-dom";
import { useState, useEffect }  from "react";

// apis
import { getNfts ,getNftMetadata } from "../apis/nft";

const NFTDetail = () =>{
    const {nftId} = useParams()
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        (async()=>{
            const result = await getNfts(nftId);
            setNft(result);
            
            const metadata = await getNftMetadata(result.metadata)
            setMetadata(metadata)
        })();
    }, []);


    useEffect(()=>{
        console.log(nft);
    }, [nft])

    useEffect(()=>{
        
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
        <div>
            {/* <img src={metadata.image}></img> */}
            {/* <h1>{nft}</h1> */}
        </div>
    )
}

export default NFTDetail;