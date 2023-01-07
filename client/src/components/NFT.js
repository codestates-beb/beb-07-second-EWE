import '../assets/css/asset.css'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {getNftMetadata} from '../apis/nft'
const NFT = ({nfts}) => {


    console.log(nfts)
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
                    {nfts.token_id}
                    </h6>
                    </div>
                    <div className="post_num id">#

                    {nfts.id}
                    
                    </div>
                </div> 
                <div className='user2'>
                    <div className="creator">
                    
                    {nfts.owner}
                    
                    </div>
                    <div className="contract_account" >
                    
                    {nfts.contract_account}
                    
                    </div>
                </div>
            </div>
            <div className="image" >
            {nfts.price}

                <img src ={nfts.metadata === undefined || nfts.metadata=== null ? 'https://play-lh.googleusercontent.com/wQiHW5YgQhHmSR_60o9l2lypA9Vn2_hxH0l2X6Iin5lEGTbmfhrZnP8bKywoRGKkJl4' :nfts.metadata.image}alt="food"></img>
            </div>

            <div className="comments">
            </div>
        </Link>
    );
}
export default NFT;