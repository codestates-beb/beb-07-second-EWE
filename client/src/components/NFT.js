import '../assets/css/asset.css'
import { Link } from 'react-router-dom';
import { getNftMetadata } from '../apis/nft';
import { useState, useEffect } from 'react'


const NFT = ({nft}) => {
    const [metadata, setMetadata] = useState(null);

    useEffect(()=>{
        getNftMetadata(nft.metadata)
        .then(metadata=>{
            setMetadata(metadata);
        })
        .catch(console.log);
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
                    {nft.token_id}
                    </h6>
                    </div>
                    <div className="post_num id">#

                    {nft.id}
                    
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

                {/* <img src ={nft.metadata === undefined ||nft.metadata=== null ? 'https://play-lh.googleusercontent.com/wQiHW5YgQhHmSR_60o9l2lypA9Vn2_hxH0l2X6Iin5lEGTbmfhrZnP8bKywoRGKkJl4' :nft.metadata}alt="food"></img> */}
            </div>

            <div className="comments">
            </div>
        </Link>
    );
}
export default NFT;