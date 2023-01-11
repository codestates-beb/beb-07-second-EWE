import axios from "axios";
import { useEffect, useState } from "react";
import Post from '../components/Post'
import NFT from '../components/NFT'

const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";

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


const Pagination = ({props,user}) => {
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    // console.log(props)
    let numPages =()=>{
        if(pagination!==null) {
            // console.log(pagination.totalNum.totalNum)

            return Math.ceil(pagination.totalNum.totalNum/limit)
        }
    }
    console.log(numPages())
    // console.log(pagination)
    useEffect(()=>{
        getPagination(page,limit, props)
            .then((result)=>{
                setPagination(result.data)
                // console.log(result.data)
                // console.log(page,limit)
            })
    },[page,limit])

    // useEffect(()=>{
    // }, [pagination])
    // useEffect(()=>{
    // }, [limit])
    useEffect( ()=>{
    }, [page])

    return(
        <div>
            {props==='posts'?
            <div className='post_wrapper'>
            {  
            props===null||pagination === null?<></>:
            
                pagination.posts.map((post)=>{
                return (<Post key={post.id} post={post} user={user}/>)
                })
            
            }
            </div>
            :
            <div className='post_wrapper'>
            {  
            props===null||pagination === null?<></>:
            
                pagination.nfts.map((nft)=>{
                return (<NFT key={nft.id} nft={nft} user={user}/>)
                })
            
            }
            </div>            } 

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
            {Array(numPages()).fill().map((_,i) => {

            <button
            className='pagination_num'
            key = {i + 1}
            onClick={()=>setPage( i + 1 )}
            aria-current = {page !== i + 1 ? "page" : null}
            >
            {console.log(i)}
            { i + 1 }
            </button>
            })}    
            <button onClick={()=> setPage( page + 1 )} disabled = {page === numPages()}>
                    <i className='fas fa-right-long'></i>
                    </button>
        </div>
        </div>
    );
}
export default Pagination;