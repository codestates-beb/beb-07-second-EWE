import '../assets/css/asset.css'
import { Link } from 'react-router-dom';
import { getNftMetadata } from '../apis/nft';
import { useState, useEffect } from 'react'
import '../assets/image/loading.gif'

const NFT = ({nft}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [metadata, setMetadata] = useState(null);
    useEffect(()=>{
        getNftMetadata(nft.metadata)
        .then(metadata=>{
            setMetadata(metadata);
            setIsLoading(false);
        })
    }, [])


    return(
        <Link 
        to={'/nft/'+ nft.token_id}
        className="asset_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fab fa-ethereum'></i>
                    </div>

                    <div className="post_title token_id">
                    <h5>
                    {metadata === null ||metadata === undefined || metadata.name === undefined ||metadata.name === null? "": metadata.name
                    }
                    <h6 className='contract_address'>{nft === null || nft.contract_address === undefined ||nft.contract_address === null? "": nft.contract_address.slice(0,10)+'...'
                    }</h6>
                    </h5>
                    </div>
                    <div className="post_num id">#
                        {nft === null ?<></>:nft.token_id}
                    </div>
                </div> 
                <div className='user2'>
                    <div className="creator">
                    
                    <h6>{nft === null ?<></>:nft.creator}</h6>
                    
                    </div>
                    <div className="nft_contract_account" >
                    {nft === null ?<></>:nft.contract_account}

                    </div>
                    <div className='createdAt'>
                    <h6>{nft.createdAt.slice(0,10)}</h6>
                    </div>
                </div>
            </div>
            <div className="image" >
                <img 
                    src ={isLoading? '../assets/image/loading.gif':
                        metadata === null || metadata === undefined || metadata.image === undefined ||metadata.image === null 
                        ? 'https://play-lh.googleusercontent.com/wQiHW5YgQhHmSR_60o9l2lypA9Vn2_hxH0l2X6Iin5lEGTbmfhrZnP8bKywoRGKkJl4' 
                        : metadata.image
                    }
                    alt="food"    
                />
            </div>

            <div className="comments">
            </div>
        </Link>
    );
}
export default NFT;