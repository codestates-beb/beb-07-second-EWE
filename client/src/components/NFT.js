import '../assets/css/asset.css'
const NFT = ({nfts}) => {
    return(
        <a href='/postdetail' className="asset_container">
            <div>
                <div className='user1'>
                <div className="user_img">
                        <i className='fas fa-utensils '></i>
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
        </a>
    );
}
export default NFT;