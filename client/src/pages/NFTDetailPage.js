import { Link,useParams } from "react-router-dom";
import { useState, useEffect }  from "react";
import { getNftOne,getNftMetadata } from "../apis/nft";
const NFTDetail = () =>{
    const {nftId} = useParams(1)
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            setNft(result);
            console.log(nft);
            setMetadata(getNftMetadata(result.metadata))
            console.log(metadata);

            setUser(result.user);
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
    console.log(metadata)
    // console.log(user)
    return(
        <div>
            {/* <img src={metadata.image}></img> */}
            {/* <h1>{nft}</h1> */}
        </div>
    )
}

export default NFTDetail;