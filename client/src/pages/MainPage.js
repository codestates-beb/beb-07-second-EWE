import '../assets/css/main.css'
import Footer from '../components/Footer'
import PostList from '../components/PostList'
import NFTList  from  '../components/NFTList'
import Pagination from '../components/Pagination'
import {postPagination} from '../apis/post'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getNfts } from '../apis/nft';
import { getPosts } from '../apis/post';

const MainPage = ({user}) => {
    const [posts, setPosts]=useState(null)
    const[postLimit, setPostLimit] = useState(10);
    const[postPage, setPostPage] = useState(1);
    const [responsibleToggle,SetResponsibleToggle] = useState(false)
    const postOffset = (postPage - 1) * postLimit
    let numPostPages =()=>{
        if(posts!==null) return Math.ceil(posts.posts.totalNum/postLimit)
    }
    const[nfts,setNfts] = useState(null)
    const[nftLimit, setNftLimit] = useState(10);
    const[nftPage, setNftPage] = useState(1);
    const nftOffset = (nftPage - 1) * nftLimit
    let numNftPages =()=>{
        if(nfts!==null) return Math.ceil(nfts.totalNum/nftLimit)
    }
    useEffect(()=>{
        getPosts(postOffset,postLimit)
            .then((result)=>{
                setPosts(result.posts)

            })
    },[]);
    useEffect(()=>{
        getNfts(nftOffset,nftLimit)
            .then((result)=>{
                setNfts(result.nfts)
                // console.log(result)
                // console.log(result.totalNum)

            })
    },[]);
    useEffect(()=>{
    }, [posts])
    useEffect(()=>{
    }, [nfts])

    return(
        <div className='main'>
            <Link to='/write' className='write'>
                <img className='post_button' src={require('../assets/image/post_1.png')}>
                </img>
            </Link>
            <div className='category narrow'>
            <i className="fa-solid fa-caret-down" onClick={()=>{SetResponsibleToggle(!responsibleToggle)}}>
                </i>
                {
                responsibleToggle === false?
                <></>
                :<div className='toggle_category'>
                    <div className='toggle_category_1'>
                        <h2>{user===null || user===undefined ?
                        'Guest' : user.nickname
                            }</h2>
                        <Link to="/mypage">My Page</Link>
                        <Link to="/market">NFT Market</Link>
                        <Link to="/">ETH Faucet</Link>
                        <Link to="/">Log Out</Link>
                        <Link to="/">Secession</Link>
                    </div>
                </div>
                }


            </div>
            <div className='category wide'>
                <Link to='/'>
                Eat Write Earn   Incentive Community : Get your token with Boasting your dishes! 
                </Link>
            </div>
            <div className='post_list'>
            <div className='post_head'>
                <h2>Popular Dishes</h2>
            </div>

                {
                <Pagination
                    props={'posts'}
                    user={user}
                />
                }
                <Link to='/market' className='market'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
                </Link>

                <div className='nft_list'>
                <div className='nft_head'>
                    <h2>NFTs</h2>
                </div>
                {
                <Pagination
                    props={'nfts'}
                    user={user}
                />
                }
            </div>
        </div>

            <Footer/>
            <div className='under_footer'></div>

        </div>
    );
}
export default MainPage;