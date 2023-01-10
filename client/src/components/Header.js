// modules
import { useState, useEffect } from "react";
import Modal from 'react-modal'
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

// apis
import { 
    localLoginUser, 
    logoutUser,
    naverLoginUser,
} from "../apis/user";

// actions
import {setAuth, resetAuth } from "../feature/authSlice";

// css
import '../assets/css/header.css'
import '../assets/css/modal.css'

const Header = ({user, liftUser}) => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(true);

    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);
    const dispatch = useDispatch();

    const closeModal=()=>{
        setIsOpen(!isOpen)
    }

    const loginFunc = async()=>{
        try{
          const result = await localLoginUser({email, password})
          console.log(result);
          liftUser(result.data.user);
          dispatch(setAuth({accessToken: result.data.accessToken}));
          setIsOpen(false);
        } catch{
          console.log("login failed");
        }
    }

    const loginEnterHandler= (e)=>{
        if(e.key === "Enter") loginFunc(email, password);
    }

    const logoutButtonHandler = async()=>{
        if(isLogin===false) return;

        try{
            const result = await logoutUser(accessToken);
            if (result.status === "ok") dispatch(resetAuth());
        }catch{
            console.log("logout failed");
        }
    }
    const socialLoginHandler = async()=>{
        await naverLoginUser();
    }

    return(
        <header>
        <Modal 
            isOpen={isOpen}
            onRequestClose={()=> setModalIsOpen(false)}
            style={{
                overlay:{
                    position:'fixed',
                    top:0,
                    left:0,
                    right:0,
                    bottom:0,
                    backgroundColor: '#00000050',
                    zIndex:'50',
                    
                },
                content:{
                    width:'420px',
                    height:'75%',
                    margin:'auto',
                    padding:'0px 3% 3% 3%',
                    position:"absolute",
                    top:'40px',
                    left:'40px',
                    right:'40px',
                    bottom:'40px',
                    border: '1px solid #ccc',
                    background:'#fff',
                    borderRadius: '30px',
                    outline:'none',
                    textAlign:'center',
                },
            }}
            >
            <div className='login_modal'>  
                <i className="fas fa-xmark" onClick={()=>closeModal()}></i>
                <div className="hide">{ isOpen===true? document.body.style= 'overflow: hidden':document.body.style = 'overflow: auto'}</div>        
                <img className='login_modal_CI'src={require('../assets/image/EWElogo_1.png')} alt='home'></img>
                <h1>Login</h1>
                <h5 className="welcome">[Welcome to EWE]</h5>
                <div>
                    <div className='login_user_info'>
                        <h2>Email</h2>
                        <input 
                            onChange={(e)=>{setEmail(e.target.value)}}
                            onKeyUp={loginEnterHandler}
                        />
                    </div>
                    <div className='login_user_info'>
                        <h2>Password</h2>
                        <input 
                            type="password" 
                            onChange={(e)=>{setPassword(e.target.value)}}
                            onKeyUp={loginEnterHandler}
                        />
                    </div>
                </div>
                <button onClick={loginFunc}><h3 className="login_button">Log in</h3></button>
                <div className="sign_up_with">
                    <a href="https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/naver/login" target="_blank">
                        <div className="modal_naver">
                            <h1>N</h1>
                            <h3>Naver Login</h3>
                        </div>
                    </a>                
                </div>
                <h4 className="create_your_account">Create your Account!</h4>
                <Link to="/signup" onClick={()=>setIsOpen(!isOpen)}><h3  className="modal_sign_up_button">Sign Up</h3></Link>
            </div>
        </Modal>
            <div className='header_left'>
                <i className='fab fa-bitcoin fa-xl'></i>
            </div>
            <div className="CI header_middle">
                <div className='header_logo'>
                    <div className="logo" >
                        <Link to="/">
                        <img src={require('../assets/image/EWElogo_1.png')}></img>
                        {/* <i className='fas fa-drumstick-bite ' 
                        ></i></Link>
                    </div>
                    <div className="ICName">
                        <Link to="/" className="bigName">
                        <h1>EWE</h1></Link>
                        <Link to="/" className="smallName">
                        <h5>Eat Write Earn</h5> */}
                        </Link>
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
                            <Link onClick={logoutButtonHandler}>Log Out</Link>
                            <Link to="/">Secession</Link>
                        </div>
                    </div>
                </div>    
                :
                <div className="userMenu">
                    <div className="Login">
                        <Link
                        onClick={()=>setIsOpen(!isOpen)}
                        >
                        <h4>Login</h4>
                        </Link>
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