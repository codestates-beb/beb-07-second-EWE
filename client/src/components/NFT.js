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
            console.log(metadata);
            setMetadata(metadata);
            setIsLoading(false);
        })
        .catch(console.log());
    }, [])
    return(
        <Link 
        // to='/postdetail'
        className="asset_container">
            <div>
                <div className='user1'>
                    <div className="user_img">
                        <i className='fab fa-ethereum'></i>
                    </div>

                    <div className="post_title token_id">
                    <h6>
                    {metadata === null || metadata.image === undefined ||metadata.image === null
                        ? ""
                        : metadata.name
                    }
                    </h6>
                    </div>
                    <div className="post_num id">#
                        {nft.token_id}
                    </div>
                </div> 
                <div className='user2'>
                    <div className="creator">
                    
                    {nft.owner}
                    
                    </div>
                    <div className="contract_account" >
                    
                    {nft.contract_account}
                    
                    </div>
                </div>
            </div>
            <div className="image" >
            {nft.price}
                <img 
                    src ={isLoading? '../assets/image/loading.gif':
                        metadata === null || metadata.image === undefined ||metadata.image === null 
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