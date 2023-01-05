import NFTList from '../components/NFTList'
import { useState } from 'react';
import '../assets/css/market.css'
const MarketPage = ({nfts}) => {
    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages = Math.ceil(nfts.length/nftLimit)


    return(
        <div className='market'>
            <NFTList
            nftLimit={nftLimit}
            nftOffset={nftOffset}
            nfts={nfts}
            />
            <div className='pagination'>
                <select 
                    type = 'number'
                    value={nftLimit}
                    onChange={({target: {value}})=> setNftLimit(Number(value))}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option>
                </select>
                <button onClick={()=> setNftPage( nftPage - 1 )} disabled = {nftPage === 1}>
                    <i className='fas fa-left-long'></i>
                </button>
                    {Array(numNftPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setNftPage( i + 1 )}
                        aria-current = {nftPage !== i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button onClick={()=> setNftPage( nftPage + 1 )}      disabled = {nftPage === numNftPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>

        </div>
        
    );
}
export default MarketPage;