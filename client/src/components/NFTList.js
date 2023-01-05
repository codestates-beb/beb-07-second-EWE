import NFT from './NFT'
const NFTList = ({nfts,nftOffset,nftLimit }) => {

    return(
        <div className='post_wrapper'>
            {  
                nfts.slice(nftOffset, nftOffset + nftLimit).map((nfts)=>{
                    return (<NFT key={nfts.id} nfts={nfts}/>)
                })
            }
            
        </div>
    );
}
export default NFTList;