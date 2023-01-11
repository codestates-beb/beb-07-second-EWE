import '../assets/css/main.css'
import Footer from '../components/Footer'
import Pagination from '../components/Pagination'
import { useState } from 'react';
import { Link } from 'react-router-dom';

const MainPage = ({user}) => {
    const [responsibleToggle,SetResponsibleToggle] = useState(false)

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