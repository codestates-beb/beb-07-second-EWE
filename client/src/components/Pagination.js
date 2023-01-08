import axios from "axios";
import { useEffect, useState } from "react";


const origin = "http://20.214.190.113:5050";

export const getPagination = async(page, limit, assets)=>{
    const paginationURL = (e)=>{
        if(e === 'nfts') return origin + "/nfts";
        else if(e === 'posts') return origin + "/posts";
    } 
    const offset = (page-1)*limit
    const pagination = await axios.get(paginationURL(assets)+ `/?offset= ${offset} &limit=${limit}`)
    .then(res=>res)
    .catch(err=>err);

    return pagination;
}


const Pagination = ({assets}) => {
    const [pagination, setPagination] = useState({})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    let numPages = Math.ceil(pagination.totalNum/limit)

    
    useEffect(()=>{
        getPagination(page,limit, assets)
            .then((result)=>{
                setPagination(result)
                console.log(result)
            })
    },{})
    return(
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
            {Array(numPages).fill().map((_,i) => {
            <button
            className='pagination_num'
            key = {i + 1}
            onClick={()=>setPage( i + 1 )}
            aria-current = {page !== i + 1 ? "page" : null}
            >
            { i + 1 }
            </button>
            })}    
            <button onClick={()=> setPage( page + 1 )} disabled = {page === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
        </div>
    );
}
export default Pagination;