import axios from "axios";
import { useEffect, useState } from "react";
import Post from '../components/Post'
import NFT from '../components/NFT'

const origin = "https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com";

export const getPagination = async(page, limit, assets, userId)=>{
    const paginationURL = (e)=>{
        if(e === 'nfts') return origin + "/nfts";
        if(e === 'posts') return origin + "/posts";
        if(e === 'nft') return origin + `/users/${userId}/nfts`;
        if(e === 'post') return origin + `/users/${userId}/posts`;
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

    let numPages =()=>{
        if(pagination!==null && pagination!==undefined) {
            let num = Math.ceil(pagination.totalNum.totalNum/limit)
            if(!isNaN(num)) {
                return num
            }else{
                return 1
            }
        }
    }


    useEffect(()=>{
        if(user!==null&&user!==undefined) {
        getPagination(page,limit, props,user.id)
            .then((result)=>{
                setPagination(result.data)
            })
        }else if(user===null||user===undefined){
        getPagination(page,limit, props,null)
            .then((result)=>{
                setPagination(result.data)
            })    
        }
    },[page,limit, props,user])


    useEffect(()=>{
        const numMapping =(e) => {
        }
        numMapping()
    },[])



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
                (pagination!==undefined&&pagination !== null)?
                    pagination.posts.map((post)=>{
                    return (<Post key={post.id} post={post} user={user}/>)
                    }):<></>
            }
            {props !== null&& props !== undefined&&props==='nfts'&&
                (pagination!==undefined&&pagination !== null)? 
                    pagination.nfts.map((nft)=>{
                    return (<NFT key={nft.id} nft={nft} user={user}/>)
                    }):<></>
            } 
            {props !== null&& props !== undefined&&props==='post'&&
                (pagination!==undefined&&pagination !== null)?
                    pagination.posts.map((post)=>{
                    return (<Post key={post.id} post={post} user={user}/>)
                    }):<></>
            }
            {props !== null&& props !== undefined&& props==='nft'&&
                (pagination!==undefined&&pagination !== null)? 
                    pagination.nfts.map((nft)=>{
                    return (<NFT key={nft.id} nft={nft} user={user}/>)
                    }):<></>
            } 
            </div>
        </div>

    );
}
export default Pagination;