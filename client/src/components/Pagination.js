import axios from "axios";
import { useEffect, useState } from "react";
import Post from '../components/Post'
import NFT from '../components/NFT'
import '../assets/css/pagenation.css'
const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";

export const getPagination = async(page, limit, assets, userId, searchData)=>{
    const paginationURL = (e)=>{
        if(e === 'nfts') return origin + "/nfts/?";
        if(e === 'posts') return origin + `/posts/findposts/?search=`+searchData+`&`;
        if(e === 'nft') return origin + `/users/${userId}/nfts/?`;
        if(e === 'post') return origin + `/users/${userId}/posts/?`;
    } 
    const offset = (page-1)*limit
    const pagination = await axios.get(paginationURL(assets)+`offset=${offset}&limit=${limit}`)
    .then(res=>res)
    .catch(err=>err);

    return pagination

}


const Pagination = ({props,user}) => {
    const [pagination, setPagination] = useState(null)
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [searchData, setSearchData] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    

    let numPages =()=>{
        if(pagination!==null && pagination!==undefined) {
            console.log(pagination)
            let num = Math.ceil(pagination.totalNum.totalNum/limit)
            if(props==='nft') {
                return Math.ceil(pagination.totalNum[0].totalNum/limit)
            }else{
                return num
            }
        }
    }
    useEffect(()=>{
        setIsLoading(true)
        if(user!==null&&user!==undefined&&searchData!==null&&searchData!==undefined) {
            getPagination(page,limit, props,user.id,searchData)
                .then((result)=>{
                    setPagination(result.data)
                    setTimeout(()=>{setIsLoading(false)},1500)
            })
        }else if((user===null||user===undefined)&&(searchData===null||searchData===undefined)){
            setIsLoading(true)
            getPagination(page,limit, props,null,' ')
                .then((result)=>{
                    setPagination(result.data)
                    setTimeout(()=>{setIsLoading(false)},1500)
            })}
    },[page,limit, props,user.id, searchData])

    useEffect(()=>{
        setPage(1)
    },[searchData])

    return(

        <div>
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
                
    
                {props==='posts'?
                <div className="search_bar" >
                <i className='fas fa-search'></i>
                <input 
                    onChange={(e)=>{setSearchData(e.target.value)}}
                    placeholder='  Search Your Place!'
                ></input></div>
                :<></>}

                <button onClick={()=> setPage( page - 1 )} disabled = {page === 1}>
                        <i className='fas fa-left-long'></i>
                        
                </button>            

                {Array(setPage).fill().map((_,i) => {
                <button
                className='pagination_num'
                key = {i + 1}
                onClick={()=>setPage( i + 1 )}
                aria-current = {page !== i + 1 ? "page" : null}>
                { i + 1 }
                </button>
                })}

                <button onClick={()=> setPage( page + 1 )} disabled = {page === numPages()}>
                        <i className='fas fa-right-long'></i>
                        </button>
            </div>
            <div className='post_wrapper'>

            {props !== null&& props !== undefined&&props==='posts'&&
                (pagination!==undefined&&pagination !== null)
                ?
                    pagination.posts.map((post)=>{
                    return (<Post key={post.id} post={post} user={user} isLoading={isLoading}/>)
                    }):
                    <></>
            }
            {props !== null&& props !== undefined&&props==='nfts'&&
                (pagination!==undefined&&pagination !== null)? 
                    pagination.nfts.map((nft)=>{
                    return (<NFT key={nft.id} nft={nft} user={user} isLoading={isLoading}/>)
                    }):<></>
            } 
            {props !== null&& props !== undefined&&props==='post'&&
                (pagination!==undefined&&pagination !== null)?
                    pagination.posts.map((post)=>{
                    return (<Post key={post.id} post={post} user={user} isLoading={isLoading}/>)
                    }):<></>
            }
            {props !== null&& props !== undefined&& props==='nft'&&
                (pagination!==undefined&&pagination !== null)? 
                    pagination.nfts.map((nft)=>{
                    return (<NFT key={nft.id} nft={nft} user={user} isLoading={isLoading}/>)
                    }):<></>
            } 
            </div>
        </div>
    );
}
export default Pagination;