import axios from "axios";
import { useEffect, useState } from "react";
const origin = "http://20.214.190.113:5050";
const postPaginationURL = origin + "/posts";

export const getPageLength = async()=>{
    
    const pageLength = await axios.get(postPaginationURL+ {    })
    .then(res=>res)
    .catch(err=>err);

    return pageLength;
}
export const getPagination = async(page, limit)=>{
    const offset = (page-1)*limit
    const pagination = await axios.post(postPaginationURL+ '/?offset=' + offset + '&limit=' + limit)
    .then(res=>res)
    .catch(err=>err);

    return pagination;
}


const Pagination = () => {
    const [pageLength, setPageLength] = useState();
    const [pages, setPages] = useState([])
    const [limit, setLimit] = useState()

    let numPages = Math.ceil(pageLength/limit)
    useEffect(()=>{
        getPageLength()
            .then((result)=>{
                setPageLength(result)
            })
    })
    useEffect(()=>{
        getPagination(pages,limit)
            .then((result)=>{
                setPages(result)
            })
    },[])
    


    return(
        <div>
                <button onClick={()=> setPages( pages - 1 )} disabled = {pages === 1}>
                    <i className='fas fa-left-long'></i>
                </button>            {Array(numPages).fill().map((_,i) => {
                <button
                        className='pagination_num'
                        key = {i + 1}
                        onClick={()=>setPages( i + 1 )}
                        aria-current = {pages !== i + 1 ? "page" : null}
                        >
                        { i + 1 }
                        </button>
            })}    
        </div>
    );
}
export default Pagination;