import axios from "axios";
import { useEffect, useState } from "react";
const origin = "http://20.214.190.113:5050";
const postPaginationURL = origin + "/posts";

export const getPagination = async(page, limit)=>{
    const offset = (page-1)*limit
    const pagination = await axios.get(postPaginationURL+ '/?offset=' + offset + '&limit=' + limit)
    .then(res=>res)
    .catch(err=>err);

    return pagination;
}


const Pagination = () => {
    const [pages, setPages] = useState({})
    const [limit, setLimit] = useState(10)
    let numPages = Math.ceil(pages.totalNum/limit)

    useEffect(()=>{
        getPagination(pages,limit)
            .then((result)=>{
                setPages(result)
                console.log(result)
            })
    },[])
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
            <button onClick={()=> setPages( pages - 1 )} disabled = {pages === 1}>
                    <i className='fas fa-left-long'></i>
            </button>            
            {Array(numPages).fill().map((_,i) => {
            <button
            className='pagination_num'
            key = {i + 1}
            onClick={()=>setPages( i + 1 )}
            aria-current = {pages !== i + 1 ? "page" : null}
            >
            { i + 1 }
            </button>
            })}    
            <button onClick={()=> setPages( pages + 1 )} disabled = {pages === numPages}>
                    <i className='fas fa-right-long'></i>
                    </button>
        </div>
    );
}
export default Pagination;