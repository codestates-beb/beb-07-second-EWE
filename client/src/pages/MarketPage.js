import NFTList from '../components/NFTList'
import { useState } from 'react';
import '../assets/css/market.css'
const MarketPage = ({nfts}) => {
    const[limit, setLimit] = useState(10);
    const[page, setPage] = useState(1);
    const offset = (page - 1) * limit
    let numPages = Math.ceil(nfts.length/limit)


    return(
        <div className='market'>
            <NFTList
            limit={limit}
            offset={offset}
            nfts={nfts}
            />
            <div className='pagination'>
                <select 
                    type = 'number'
                    value={limit}
                    onChange={({target: {value}})=> setLimit(Number(value))}>
                    <option value='5'>5</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='30'>30</option>
                    <option value='100'>100</option>
                </select>
                <button onClick={()=> setPage( page - 1 )} disabled = {page === 1}>
                    <i className='fas fa-left-long'></i>
                </button>
                    {Array(numPages)
                    .fill()
                    .map((_,i) => (
                        <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPage( i + 1 )}
                        aria-current = {page !== i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
                        ))
                    }
                    <button onClick={()=> setPage( page + 1 )}      disabled = {page === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
                </div>

        </div>
        
    );
}
export default MarketPage;