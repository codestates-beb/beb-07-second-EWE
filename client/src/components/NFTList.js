import NFT from './NFT'
const NFTList = ({nfts,offset,limit }) => {

    return(
        <div className='post_wrapper'>
            {  
                nfts.slice(offset, offset + limit).map((nfts)=>{
                    return (<NFT key={nfts.id} nfts={nfts}/>)
                })
            }
            
        </div>
    );
}
export default NFTList;