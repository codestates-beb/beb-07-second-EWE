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
    updateUser,
} from "../apis/user";

import { transferToken } from "../apis/token";

// actions
import {setAuth, resetAuth } from "../feature/authSlice";

// css
import '../assets/css/header.css'
import '../assets/css/modal.css'


const Header = ({user, liftUser}) => {
    // Header State Var
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [sidebarModalIsOpen, setSidebarModalIsOpen] = useState(false);
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);

    // Login Global State Redux
    const isLogin = useSelector((state)=>state.auth.isLogin);
    const accessToken = useSelector((state)=>state.auth.accessToken);
    const dispatch = useDispatch();

    // Token Transfer State Var
    const [recepient, setRecepient] = useState("");
    const [amount, setAmount] = useState("")

    // Update Mode
    const [updateMode, setUpdateMode] = useState(false);

    const [emailToUpdate, setEmailToUpdate] = useState("");
    const [nicknameToUpdate, setNicknameToUpdate] = useState("");
    const [passwordToUpdate, setPasswordToUpdate] = useState("");
    const [passwordToVerify, setPasswordToVerify] = useState("");


    const closeLoginModal=()=>{
        setLoginModalIsOpen(!loginModalIsOpen)
    }
    const closeSidebarModal=()=>{
        setSidebarModalIsOpen(!sidebarModalIsOpen)
    }
    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (e) {
        }
    };

    const userUpdateSubmitButtonHandler= async()=>{
        if (!isLogin) return;

        const userInfoToUpdate = {}
        if (passwordToUpdate.length > 0){
            if(passwordToUpdate !== passwordToVerify) return;
            userInfoToUpdate.password = passwordToUpdate;
        }

        if (emailToUpdate.length > 0){
            userInfoToUpdate.email = emailToUpdate;
        }

        if (nicknameToUpdate.length > 0)
            userInfoToUpdate.nickname = nicknameToUpdate;

        const userUpdated = await updateUser(userInfoToUpdate, user.id)
        .then(result=>result)
        .catch(err=>err);

        if(!userUpdated) return;
        liftUser(userUpdated);
        setUpdateMode(false);
    }

    const loginFunc = async()=>{
        try{
            const result = await localLoginUser({email, password})
            liftUser(result.data.user);
            dispatch(setAuth({
                accessToken: result.data.accessToken, 
                userID: result.data.user.id
              }));
            setLoginModalIsOpen(false);
        } catch{
            console.log("login failed");
        }
    }

    const tokenTransferButtonHandler = async ()=>{
        const isSuccess = await transferToken(recepient, amount, accessToken)
        if (isSuccess === true) console.log("success");
        else console.log("failed");
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
            <div className='header_left'>
                <i 
                className='fab fa-bitcoin fa-xl'
                onClick={()=>setSidebarModalIsOpen(!sidebarModalIsOpen)}></i>
            </div>
            <Modal
                isOpen={sidebarModalIsOpen}
                onRequestClose={()=> closeSidebarModal(false)}
                style={{
                    overlay:{
                        position:'fixed',
                        top:0,
                        left:0,
                        right:0,
                        bottom:0,
                        backgroundColor: '#00000050',
                        zIndex:'40',
                        
                    },
                    content:{
                        width:'240px',
                        height:'100%',
                        margin:'auto',
                        padding:'0',
                        position:"absolute",
                        top:'0px',
                        left:'0px',
                        right:'90%',
                        bottom:'0px',
                        border: '1px solid #ccc',
                        background:'#fff',
                        outline:'none',
                        textAlign:'left',
                    },
                }}
            >
                <div className='modal_sidebar'>
                    <div className="sidebar_head">
                        <i className="fas fa-xmark" onClick={()=>{closeSidebarModal(); setUpdateMode(false)}}></i>
                        {updateMode ?
                            <button className="user_submit" onClick={userUpdateSubmitButtonHandler}>Submit</button>
                            :
                            <button className="user_edit" onClick={()=>{setUpdateMode(true)}}>Edit</button>
                        }
                    </div>
                    <div className='user_info'>
                        <div className='sidebar_user user_info_1'>
                                <h2>User Information</h2>
                            {!updateMode ?
                                <>
                                <div className="nickname">
                                    <h3>Nickname</h3>
                                    {user===null?<div>Guest</div>:user.nickname}
                                </div>
                                <div className="email">
                                    <h3>Email</h3>
                                    {user===null?<div>-</div>:user.email}
                                </div>
                                <div className="wallet_account">
                                    <h3>Wallet Account</h3>
                                    <div className='account'>
                                        <p>{user===null?<div>-</div>:user.wallet_account}</p>
                                        <button onClick={() => {handleCopyClipBoard(user.wallet_account)}}>copy</button>
                                    </div>
                                </div>
                                <div className="eth">
                                    <h3>Balance</h3>
                                    {user===null?<div>0</div>:user.eth}ETH
                                </div>
                                <div className="erc20">
                                    <h3>Token</h3>
                                    {user===null?<div>0</div>:user.erc20}
                                </div>
                                </>
                            :
                                <>
                                <div className="nickname">
                                    <h3>Nickname</h3>
                                    <input 
                                        value={nicknameToUpdate}
                                        onChange={e=>{setNicknameToUpdate(e.target.value)}}
                                    />
                                </div>
                                <div className="email">
                                    <h3>Email</h3>
                                    <input 
                                        value={emailToUpdate}
                                        onChange={e=>{setEmailToUpdate(e.target.value)}}
                                    />
                                </div>
                                <div className="password">
                                    <h3>Password</h3>
                                    <input
                                        value={passwordToUpdate}
                                        onChange={e=>{setPasswordToUpdate(e.target.value)}}
                                    />
                                </div>
                                <div className="password_check">
                                    <h3>Password Check</h3>
                                    <input
                                        value={passwordToVerify}
                                        onChange={e=>{setPasswordToVerify(e.target.value)}}
                                    />
                                </div>
                                </>
                            }
                    </div>
                </div>
                <div className='sidebar_user user_info_2'>
                    <div className='token_transfer'>
                        <h2>Token Transfer</h2>
                        <div className="receivers_address">
                            <h4>Receiver's Address</h4>
                            <input onChange={e=>{setRecepient(e.target.value)}}/>
                        </div>
                        <div className="amount">
                            <h4>Amount</h4>
                            <input 
                                onChange={e=>{
                                    const { value } = e.target;
                                    const onlyNumber = value.replace(/[^0-9]/g, '');
                                    setAmount(onlyNumber);}
                                }
                                value={amount}
                            />
                        </div>
                        <div 
                            className='transaction'
                            onClick={tokenTransferButtonHandler}
                        >
                            <h2>Transaction</h2>
                        </div>
                    </div>
                </div>
                <div className='sidebar_user user_info_3'>
                    <div className='nft_transfer'>
                        <h2>NFT Transfer</h2>
                        <div className="receivers_address">
                            <h4>Receiver's Address</h4>
                            <input></input>
                        </div>
                        <div className="amount">
                            <h4>Amount</h4>
                            <input></input>
                        </div>
                        <div 
                            className='transaction'
                            
                        >
                            <h2>Transaction</h2>
                        </div>
                    </div>
                </div>
            </div>
            </Modal>
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
                            <h3>{user===null?"":user.nickname}</h3>
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
                        onClick={()=>setLoginModalIsOpen(!loginModalIsOpen)}
                        >
                        <h4>Login</h4>
                        </Link>
                        <Modal 
                isOpen={loginModalIsOpen}
                onRequestClose={()=> setLoginModalIsOpen(false)}
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
                    <i className="fas fa-xmark" onClick={()=>closeLoginModal()}></i>
                    <div className="hide">{ loginModalIsOpen===true? document.body.style= 'overflow: hidden':document.body.style = 'overflow: auto'}</div>        
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
                    <button onClick={()=>closeLoginModal()}><h3 className="login_button" onClick={loginFunc}>Log in</h3></button>
                    <div className="sign_up_with">
                        <a href="https://nodeauction.42msnsnsfoav6.ap-northeast-2.cs.amazonlightsail.com/naver/login" target="_blank">
                            <div className="modal_naver">
                                <h1>N</h1>
                                <h3>Naver Login</h3>
                            </div>
                        </a>                
                    </div>
                    <h4 className="create_your_account">Create your Account!</h4>
                    <Link to="/signup" onClick={()=>setLoginModalIsOpen(!loginModalIsOpen)}><h3  className="modal_sign_up_button">Sign Up</h3></Link>
                </div>
            </Modal>

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