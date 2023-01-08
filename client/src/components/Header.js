// modules
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

// css
import '../assets/css/header.css'

const Header = ({user, isLogin, loginFunc}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginEnterHandler= (e)=>{
        if(e.key === "Enter") loginFunc(email, password);
    }

    return(
        <header>
            <div className='header_left'>
                <i className='fab fa-bitcoin fa-xl'></i>
            </div>
            <div className="CI header_middle">
                <div className='header_logo'>
                    <div className="logo" >
                        <Link to="/"><i className='fas fa-drumstick-bite ' 
                        ></i></Link>
                    </div>
                    <div className="ICName">
                        <Link to="/" className="bigName">
                        <h1>EWE</h1></Link>
                        <Link to="/" className="smallName">
                        <h5>Eat Write Earn</h5></Link>
                    </div>
                </div>
            </div>
            <div className='header_right'>
                {isLogin?
                <div className="userMenu">
                    <div className='user'>
                        <div>
                            <i className='fas fa-user '></i>
                            {/* <img src='{userImg}'></img> */}
                        </div>
                        <div className="userTab">
                            <h3>{user.nickname}</h3>
                            <Link to="/mypage">My Page</Link>
                            <Link to="/market">NFT Market</Link>
                            <Link to="/">ETH Faucet</Link>
                            <Link to="/">Log Out</Link>
                            <Link to="/">Secession</Link>
                        </div>
                    </div>
                </div>    
                :
                <div className="userMenu">
                    <div className="Login">
                        <Link to="/">
                        <h4>Login</h4>
                        </Link>
                        <div className='user_info'>
                            <input 
                                placeholder='ID' 
                                onChange={(e)=>{setEmail(e.target.value)}}
                                onKeyUp={loginEnterHandler}
                            />
                            <input 
                                placeholder='PW' 
                                type="password" 
                                onChange={(e)=>{setPassword(e.target.value)}}
                                onKeyUp={loginEnterHandler}
                            />
                        </div>
                    </div>
                    <div className="signup">
                        <Link to="/signup">
                        <h4>SignUp</h4>
                        </Link>
                    </div>
                    <div className='user'>
                        <div>
                            <i className='fas fa-user '></i>
                            {/* <img src='{userImg}'></img> */}
                        </div>
                    </div>
                </div> 
                }
            </div>
        </header>
    );
}
export default Header;