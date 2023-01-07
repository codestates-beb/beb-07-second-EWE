import NFT from './NFT'
const NFTList = ({nfts,nftOffset,nftLimit }) => {

    return(
        <div className='post_wrapper'>
            {  
                nfts.slice(nftOffset, nftOffset + nftLimit).map((nft)=>{
                    return (<NFT key={nft.id} nft={nft}/>)
                })
            }
            
        </div>
    );
}
export default NFTList;