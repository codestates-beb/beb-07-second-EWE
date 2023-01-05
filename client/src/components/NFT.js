import '../assets/css/asset.css'
const NFT = ({nft}) => {
    return(
        <a href='/postdetail' className="asset_container">
            <div>
                <div className='user1'>
                    <div className="post_title"><h6>{nft.title}</h6></div>
                    <div className="post_num">#{nft.id}</div>
                </div> 
                <div className='user2'>
                    <div className="creator">{nft.creator}</div>
                    <div className="createdAt" >{nft.created_at.slice(0,10)}</div>
                </div>
            </div>
            <div className="image" >
                <img src = {nft.images}  alt="food"></img>
            </div>

            <div className="comments">
            </div>
        </a>
    );
}
export default NFT;