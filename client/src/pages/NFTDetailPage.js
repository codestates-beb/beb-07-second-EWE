// modules
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect }  from "react";

// apis
import { getNfts , getNftOne,getNftMetadata } from "../apis/nft";
import "../assets/css/nftdetail.css";

// components
import Pagination from "../components/Pagination";

const NFTDetail = () =>{
    const {nftId} = useParams()
    const [ nft , setNft ] = useState(null)
    const [metadata, setMetadata] = useState(null);
    const navigator = useNavigate();
    // const [isLoading, setIsLoading] = useState(true);
    // const [user, setUser] = useState(null);


    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            // console.log(result);
            setNft(result);
            const metadata = await getNftMetadata(result.metadata)
            // console.log(metadata);
            setMetadata(metadata)
        })();
    }, []);

    useEffect(()=>{
        (async()=>{
            const result = await getNftOne(nftId);
            setNft(result);
            const metadata = await getNftMetadata(result.metadata)
            if (result.status === 400) navigator("/404");

            setMetadata(metadata)
        })();
    }, [nftId]);

    useEffect(()=>{
    }, [nft])

    useEffect(()=>{
    }, [metadata])





    return(
        <div className="nft_detail">
            <Link to='/market' className='market'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
            </Link>

            <div className="nft_detail_wrapper">
                <div className="nft_image">
                    <h2>image</h2>
                    <img src={(metadata===null||metadata===undefined)||
                    (metadata.image===null||metadata.image===undefined)
                    ?<></>:
                    metadata.image
                    } alt='nft_image'/>
                </div>
                <div className="nft_info">
                    <div className="nft_name">
                        <h2>name</h2>
                        <h1>{metadata===null||metadata===undefined?<></>:metadata.name}</h1>
                    </div>
                    <div className="nft_description">
                        <div className="nft_attributes">
                            <h2>{metadata===null||metadata===undefined?<></>:metadata.attributes[0].trait_type}</h2>
                            <h3>{metadata===null||metadata===undefined?<></>:metadata.attributes[0].value}</h3>
                    </div>
                    <h2>description</h2>
                    <h5>{metadata===null||metadata===undefined?<></>:metadata.description}</h5>
                    </div>
                </div>
            </div>
            {
                <Pagination
                    props={'nfts'}
                    user={''}
                />
                }  
                
            <img className='post_button' src={require('../assets/image/bottom.png')} onClick={()=>navigator(-1)}>
                </img>
        </div>
    )
}

export default NFTDetail;