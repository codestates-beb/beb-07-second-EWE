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
        console.log(nft)

    }, [nft])

    useEffect(()=>{
        console.log(metadata)
    }, [metadata])





    return(
        <div>
            <Link to='/market' className='market'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
            </Link>
        <div className="nft_detail">
            <div className="nft_detail_wrapper">
                <div className="nft_image">
                    <div className="nft_image_top">
                        <h1>{(metadata===null||metadata===undefined)||
                            (metadata.name===null||metadata.name===undefined)
                        ?<></>:metadata.name}</h1>
                        <h3>{(nft===null||nft===undefined)||
                            (nft.token_id===null||nft.token_id===undefined)
                        ?<></>:'#'+nft.token_id}</h3>
                    </div>
                    
                    <div className="nft_image_body">
                    <img src={(metadata===null||metadata===undefined)||
                    (metadata.image===null||metadata.image===undefined)
                    ?<></>:
                    metadata.image
                    } alt='nft_image'/>
                    </div>
                </div>
                <div className="nft_info">
                    <div className="nft_creator">
                        <h2>Creator</h2>
                        <div className="nft_detail_user_info">
                            <h5>{nft===null||nft===undefined?<></>:'ID  '+nft.user_id}</h5>
                            <h5>{nft===null||nft===undefined?<></>:'Wallet '+nft.creator.slice(0,8)+'...'}</h5>
                        </div>
                    </div>
                    <div className="nft_detail_numbers">

                    <div className="nft_price">
                        <h2>Price</h2>
                        <h4>{nft===null||nft===undefined?<></>:nft.price+'EWE'}</h4>
                    </div>
                        <div className="nft_attributes">
                                <h2>{(metadata===null||metadata===undefined)||
                                    (metadata.attributes[0]===null||metadata.attributes[0]===undefined)||(metadata.attributes[0].trait_type===null||metadata.attributes[0]. trait_type===undefined)
                        ?<></>:metadata.attributes[0].trait_type}</h2>
                                <h5>{(metadata===null||metadata===undefined)||
                                    (metadata.attributes[0]===null||metadata.attributes[0]===undefined)||
                                    (metadata.attributes[0].value===null||metadata.attributes[0].value===undefined)?<></>:metadata.attributes[0].value}</h5>
                        </div>
                    </div>
                    <div className="date">
                        <div className="nft_created_at">
                            <h2>Created At</h2>
                            <h5>{nft===null||nft===undefined?<></>:nft.createdAt.slice(0,10)}</h5>
                        </div>
                        <div className="nft_updated_at">
                            <h2>Updated At</h2>
                            <h5>{nft===null||nft===undefined?<></>:nft.updatedAt.slice(0,10)}</h5>
                        </div>
                    </div>
                    <div className="nft_description">
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
            </div>
            <Link to='/' className='mint'>
            <img className='post_button' src={require('../assets/image/main.png')}/></Link>
        </div>
    )
}

export default NFTDetail;