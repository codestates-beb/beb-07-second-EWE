import '../assets/css/asset.css'
import { Link } from 'react-router-dom';
const NFT = ({nfts}) => {
    //nft matadata
    return(
        <Link to='/postdetail' className="asset_container">
            <div>
                <div className='user1'>
                <div className="user_img">
                        <i className='fab fa-ethereum'></i>
                    </div>

                    <div className="post_title token_id"><h6>{nfts.token_id}</h6></div>
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

                {/* <img src ={nfts.price}alt="food"></img> */}
            </div>

            <div className="comments">
            </div>
        </Link>
    );
}
export default NFT;