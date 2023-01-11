import { useState } from 'react';
import {Link} from 'react-router-dom' 
import Pagination from '../components/Pagination'
import '../assets/css/mypage.css'
import Footer from '../components/Footer'


const MyPage = ({user}) => {
    const [responsibleToggle,SetResponsibleToggle] = useState(false)

    return(
        <div>
            <Link to='/write' className='write'>
                <img className='post_button' src={require('../assets/image/post_2.png')}></img>
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
            <div className='mypage'>
                <h1 className='my_assets'>My Posts</h1>
            {
            <Pagination
                props={'post'}
                user={user}
            />
            }
            </div>
            <Link to='/mint' className='mint'>
                <img className='post_button' src={require('../assets/image/mint.png')}>
                </img>
            </Link>
            <div className='mypage'>

            <h1 className='my_assets'>My NFTs</h1>
            {
            <Pagination
                props={'nft'}
                user={user}
            />
            }
            </div>
            <img className='post_button' src={require('../assets/image/bottom.png')}/>
        </div>
    );
}
export default MyPage;